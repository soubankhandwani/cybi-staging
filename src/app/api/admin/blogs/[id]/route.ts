import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/server/auth";
import { getDemoPost, isDuplicateBlogSlug, readBlogInput, type BlogRecord } from "@/lib/server/blogs";
import { getDb } from "@/lib/server/mongodb";
import { apiError, isSameOrigin } from "@/lib/server/security";

type RouteContext = { params: Promise<{ id: string }> };
const missing = () => NextResponse.json({ error: "Blog not found." }, { status: 404 });

async function authorize(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  return null;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const rejected = await authorize(request);
    if (rejected) return rejected;
    const { id } = await params;
    if (!ObjectId.isValid(id)) return missing();
    const { fields, revision } = await readBlogInput(request);
    const db = await getDb();
    const blogs = db.collection<BlogRecord>("blogs");
    const _id = new ObjectId(id);
    if (getDemoPost(fields.slug) && !(await blogs.findOne({ _id, slug: fields.slug }, { projection: { _id: 1 } }))) {
      return NextResponse.json({ error: "That URL slug is already in use." }, { status: 409 });
    }
    const values = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { $literal: value }]));
    const result = await blogs.updateOne({ _id, ...(revision ? { updatedAt: new Date(revision) } : {}) }, [{
      $set: {
        ...values,
        updatedAt: { $max: ["$$NOW", { $add: ["$updatedAt", 1] }] },
        publishedAt: fields.status === "published" ? { $ifNull: ["$publishedAt", "$$NOW"] } : "$$REMOVE",
      },
    }]);
    if (result.matchedCount) return NextResponse.json({ ok: true });
    if (revision && await blogs.findOne({ _id }, { projection: { _id: 1 } })) {
      return NextResponse.json({ error: "This article changed since you opened it. Copy your edits before reopening it." }, { status: 409 });
    }
    return missing();
  } catch (error) {
    if (isDuplicateBlogSlug(error)) return NextResponse.json({ error: "That URL slug is already in use." }, { status: 409 });
    return apiError(error, "The blog could not be updated.");
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const rejected = await authorize(request);
    if (rejected) return rejected;
    const { id } = await params;
    if (!ObjectId.isValid(id)) return missing();
    const db = await getDb();
    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount ? NextResponse.json({ ok: true }) : missing();
  } catch (error) {
    return apiError(error, "The blog could not be deleted.");
  }
}