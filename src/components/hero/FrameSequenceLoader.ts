export interface FlightSequence { id: string; frames: string[] }
type SequenceCache = { controller: AbortController; blobs: Map<number, Blob>; failed: Set<number> };
type DecodedImage = ImageBitmap | HTMLImageElement;
type DecodedFrame = { sequence: number; index: number; bitmap: DecodedImage };

function releaseImage(image: DecodedImage) {
  if ("close" in image) image.close();
}

function decodeBlob(blob: Blob): Promise<DecodedImage> {
  if (typeof window.createImageBitmap === "function") return window.createImageBitmap(blob);
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Frame decode failed"));
    };
    image.src = url;
  });
}

/** Fetch only two sequences; keep at most 24 decoded frames (~84 MB at 1280×720).
 * Compressed blobs are cheap; decoding a whole sequence would consume hundreds of MB.
 */
export class FrameSequenceLoader {
  private caches = new Map<number, SequenceCache>();
  private decoded = new Map<string, DecodedFrame>();
  private decoding = new Set<string>();
  private queue: { sequence: number; index: number }[] = [];
  private running = 0;
  private current = -1;
  private wanted = new Set<string>();
  private focus = new Map<number, number>();
  private disposed = false;

  constructor(private sequences: FlightSequence[], private onReady: () => void) {}

  retain(current: number) {
    if (this.disposed || current === this.current) return;
    this.current = current;
    const keep = [current, (current + 1) % this.sequences.length];
    for (const [sequence, cache] of this.caches) {
      if (keep.includes(sequence)) continue;
      cache.controller.abort();
      this.caches.delete(sequence);
      this.focus.delete(sequence);
      for (const [key, frame] of this.decoded) {
        if (frame.sequence === sequence) { releaseImage(frame.bitmap); this.decoded.delete(key); }
      }
    }
    this.queue = this.queue.filter((item) => keep.includes(item.sequence));
    for (const sequence of keep) {
      if (this.caches.has(sequence)) continue;
      this.caches.set(sequence, { controller: new AbortController(), blobs: new Map(), failed: new Set() });
      const count = this.sequences[sequence].frames.length;
      // Endpoints first, then coarse coverage before filling in the intervening frames.
      const order = new Set([0, count - 1]);
      for (const step of [8, 4, 2, 1]) for (let index = 0; index < count; index += step) order.add(index);
      for (const index of order) this.queue.push({ sequence, index });
    }
    this.queue.sort((a, b) => Number(b.sequence === current) - Number(a.sequence === current));
    this.pump();
  }

  beginFrame() { this.wanted.clear(); }

  frame(sequence: number, progress: number): DecodedImage | undefined {
    if (this.disposed) return;
    const index = Math.round(progress * (this.sequences[sequence].frames.length - 1));
    const key = `${sequence}:${index}`;
    this.wanted.add(key);
    this.focus.set(sequence, index);
    this.prepareWindow(sequence, index);
    const exact = this.decoded.get(key);
    if (exact) {
      this.decoded.delete(key);
      this.decoded.set(key, exact);
      return exact.bitmap;
    }
    let nearest: DecodedFrame | undefined;
    for (const frame of this.decoded.values()) {
      if (frame.sequence === sequence && (!nearest || Math.abs(frame.index - index) < Math.abs(nearest.index - index))) nearest = frame;
    }
    return nearest?.bitmap;
  }

  /** Keep the exact frame and its nearest neighbours hot so subframe blending never
   * has to fall back to a distant decoded keyframe during quick wheel gestures.
   */
  private prepareWindow(sequence: number, center: number) {
    const cache = this.caches.get(sequence);
    if (!cache) return;
    const last = this.sequences[sequence].frames.length - 1;
    const nearby = [center, center - 1, center + 1, center - 2, center + 2, center - 3, center + 3]
      .filter((index) => index >= 0 && index <= last);
    const priority: { sequence: number; index: number }[] = [];
    for (const index of nearby) {
      const key = `${sequence}:${index}`;
      if (cache.blobs.has(index)) {
        if (!this.decoded.has(key)) this.decode(sequence, index, cache);
        continue;
      }
      const queued = this.queue.findIndex((item) => item.sequence === sequence && item.index === index);
      if (queued >= 0) priority.push(...this.queue.splice(queued, 1));
    }
    if (priority.length) this.queue.unshift(...priority);
    this.pump();
  }

  private pump() {
    while (!this.disposed && this.running < 6 && this.queue.length) {
      const { sequence, index } = this.queue.shift()!;
      const cache = this.caches.get(sequence);
      if (!cache) continue;
      this.running++;
      void fetch(this.sequences[sequence].frames[index], { signal: cache.controller.signal, cache: "force-cache" })
        .then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.blob(); })
        .then((blob) => {
          if (this.disposed || cache.controller.signal.aborted) return;
          cache.blobs.set(index, blob);
          const focus = this.focus.get(sequence);
          if (this.wanted.has(`${sequence}:${index}`) || (focus !== undefined && Math.abs(focus - index) <= 3)) {
            this.decode(sequence, index, cache);
          }
        })
        .catch(() => { cache.failed.add(index); }) // Supplied world stills cover failed network requests.
        .finally(() => { this.running--; this.pump(); });
    }
  }

  private decode(sequence: number, index: number, cache: SequenceCache) {
    const key = `${sequence}:${index}`;
    if (this.decoding.has(key) || cache.failed.has(index)) return;
    this.decoding.add(key);
    void decodeBlob(cache.blobs.get(index)!)
      .then((bitmap) => {
        if (this.disposed || cache.controller.signal.aborted) { releaseImage(bitmap); return; }
        this.decoded.set(key, { sequence, index, bitmap });
        while (this.decoded.size > 24) {
          const oldest = this.decoded.keys().next().value!;
          releaseImage(this.decoded.get(oldest)!.bitmap);
          this.decoded.delete(oldest);
        }
        this.onReady();
      })
      .catch(() => { cache.failed.add(index); })
      .finally(() => { this.decoding.delete(key); });
  }

  dispose() {
    this.disposed = true;
    this.queue = [];
    for (const cache of this.caches.values()) cache.controller.abort();
    for (const frame of this.decoded.values()) releaseImage(frame.bitmap);
    this.caches.clear();
    this.decoded.clear();
  }
}
