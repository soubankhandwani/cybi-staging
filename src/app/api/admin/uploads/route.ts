import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/server/auth";
import { saveBlogImage } from "@/lib/server/blog-media";
import { apiError, isSameOrigin, randomToken, readBody } from "@/lib/server/security";

export const runtime = "nodejs";
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_PIXELS = 25_000_000;

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.startsWith("multipart/form-data;")) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    const body = await readBody(request, MAX_BYTES + 16_384);
    const form = await new Response(new Uint8Array(body), { headers: { "content-type": contentType } }).formData().catch(() => null);
    const file = form?.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    if (!file.size || file.size > MAX_BYTES) return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });

    let image: Buffer;
    let extension: string;
    try {
      const source = sharp(Buffer.from(await file.arrayBuffer()), { animated: true, limitInputPixels: MAX_PIXELS });
      const { format, width, height, pages } = await source.metadata();
      if (format !== "jpeg" && format !== "png" && format !== "webp" && format !== "gif") throw new Error();
      if (!width || !height || width * height * (pages ?? 1) > MAX_PIXELS) throw new Error();
      image = await source.rotate().toFormat(format).toBuffer();
      extension = format === "jpeg" ? "jpg" : format;
    } catch {
      return NextResponse.json({ error: "Use a valid JPEG, PNG, WebP, or GIF image under 25 megapixels." }, { status: 415 });
    }
    if (image.length > MAX_BYTES) return NextResponse.json({ error: "The processed image exceeds 5 MB. Resize it and try again." }, { status: 413 });

    const fileName = Date.now() + "-" + randomToken(12) + "." + extension;
    await saveBlogImage(fileName, image);
    return NextResponse.json({ url: "/uploads/blog/" + fileName }, { status: 201 });
  } catch (error) {
    return apiError(error, "The image could not be uploaded.");
  }
}