import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Use an installed FFmpeg, or set FFMPEG_PATH. Never substitute generated artwork.
const root = fileURLToPath(new URL("../", import.meta.url));
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
const flights = [
  ["a-to-b", "neuron a to b.mp4"],
  ["b-to-c", "neuron b to c.mp4"],
  ["c-to-a", "neuron c to a.mp4"],
];
const manifest = [];
for (const [id, source] of flights) {
  const input = resolve(root, "public/hero", source);
  if (!existsSync(input)) throw new Error(`Missing asset: ${input}`);
  const output = resolve(root, "public/hero/frames", id);
  mkdirSync(output, { recursive: true });
  // Refuse to overwrite a supplied sequence or leave stale extra frames behind.
  if (readdirSync(output).length) throw new Error(`Frame directory must be empty: ${output}`);
  const result = spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-n", "-i", input,
    "-an", "-vf", "fps=24,scale=1280:-2", "-c:v", "libwebp",
    "-quality", "72", "-compression_level", "4", resolve(output, "frame-%04d.webp"),
  ], { stdio: "inherit" });
  if (result.error || result.status !== 0) throw result.error || new Error(`Extraction failed: ${input}`);
  const frames = readdirSync(output).filter((name) => /^frame-\d{4}\.webp$/.test(name)).sort();
  if (!frames.length) throw new Error(`No frames extracted: ${output}`);
  manifest.push({ id, frames: frames.map((name) => `/hero/frames/${id}/${name}`) });
  console.log(`${id}: ${frames.length} frames extracted from ${source}`);
}
writeFileSync(resolve(root, "src/components/hero/flight-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
