import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/server/auth";
import { getDemoPost, isDuplicateBlogSlug, readBlogInput } from "@/lib/server/blogs";
import { getDb } from "@/lib/server/mongodb";
import { apiError, isSameOrigin } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    const { fields } = await readBlogInput(request);
    if (getDemoPost(fields.slug)) return NextResponse.json({ error: "That URL slug is already in use." }, { status: 409 });
    const now = new Date();
    const db = await getDb();
    const result = await db.collection("blogs").insertOne({
      ...fields,
      authorName: admin.name,
      createdAt: now,
      updatedAt: now,
      ...(fields.status === "published" ? { publishedAt: now } : {}),
    });
    return NextResponse.json({ id: result.insertedId.toHexString() }, { status: 201 });
  } catch (error) {
    if (isDuplicateBlogSlug(error)) return NextResponse.json({ error: "That URL slug is already in use." }, { status: 409 });
    return apiError(error, "The blog could not be saved.");
  }
}