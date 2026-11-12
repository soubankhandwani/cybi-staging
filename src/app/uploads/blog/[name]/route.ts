import { readBlogImage } from "@/lib/server/blog-media";

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  try {
    const image = await readBlogImage((await params).name);
    if (!image) return new Response(null, { status: 404 });
    return new Response(new Uint8Array(image.bytes), {
      headers: {
        "Content-Type": image.type,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Blog image could not be retrieved.", error instanceof Error ? error.name : "Unknown error");
    return new Response(null, { status: 503 });
  }
}