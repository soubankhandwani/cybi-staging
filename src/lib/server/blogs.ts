import "server-only";

import { MongoServerError, ObjectId } from "mongodb";
import type { NextRequest } from "next/server";
import { cache } from "react";
import sanitizeHtml from "sanitize-html";
import { getDb } from "@/lib/server/mongodb";
import { blogPosts as demoBlogPosts, type BlogPost as DemoBlogPost } from "@/data/editorial-content";
import { blogImageExists, IMAGE_PATH } from "@/lib/server/blog-media";
import { RequestBodyError, readJson } from "@/lib/server/security";
import { blogSchema } from "@/lib/server/validation";

export type BlogStatus = "draft" | "published";
export type BlogRecord = {
  _id: ObjectId;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  featuredImage: string;
  imageAlt: string;
  bodyHtml: string;
  bodyText: string;
  status: BlogStatus;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
};

export type BlogDto = Omit<BlogRecord, "_id"> & { id: string; readTime: string; displayDate: string };

const allowedHtml = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "a", "img", "hr", "code", "pre"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};

export function cleanBlogHtml(value: string) {
  return sanitizeHtml(value, {
    ...allowedHtml,
    exclusiveFilter: (frame) => frame.tag === "img" && !(IMAGE_PATH.test(frame.attribs.src || "") || /^https:\/\//i.test(frame.attribs.src || "")),
  });
}

function htmlToText(value: string) {
  return sanitizeHtml(value.replace(/<\/(?:p|h[2-4]|li|blockquote|pre)>|<br\s*\/?>/gi, "$& "), {
    allowedTags: [],
    allowedAttributes: {},
  }).replace(/&nbsp;|[\u200b-\u200d\ufeff]|\s+/g, " ").trim();
}

export async function readBlogInput(request: NextRequest) {
  const parsed = blogSchema.safeParse(await readJson(request, 3_100_000));
  if (!parsed.success) throw new RequestBodyError(400, parsed.error.issues[0]?.message || "Invalid blog data.");
  const { revision, ...fields } = parsed.data;
  const bodyHtml = cleanBlogHtml(fields.bodyHtml);
  const bodyText = htmlToText(bodyHtml);
  if (bodyText.length < 20) throw new RequestBodyError(400, "The article body is too short.");
  const images = new Set([fields.featuredImage]);
  for (const match of bodyHtml.matchAll(/<img\s[^>]*?\bsrc="(\/uploads\/blog\/[^"<>]+)"/gi)) images.add(match[1]);
  if (images.size > 50) throw new RequestBodyError(400, "Use at most 50 uploaded images per article.");
  const available = await Promise.all([...images].map(blogImageExists));
  if (available.includes(false)) throw new RequestBodyError(400, "An article image is missing. Upload it again before saving.");
  return { fields: { ...fields, bodyHtml, bodyText }, revision };
}

export function isDuplicateBlogSlug(error: unknown) {
  return error instanceof MongoServerError && error.code === 11000;
}

function toDto(post: BlogRecord): BlogDto {
  const date = post.publishedAt || post.updatedAt;
  const words = post.bodyText.trim().split(/\s+/).filter(Boolean).length;
  const { _id, ...fields } = post;
  return {
    ...fields,
    id: _id.toHexString(),
    readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    displayDate: new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date),
  };
}

export async function listAdminBlogs() {
  const db = await getDb();
  return (await db.collection<BlogRecord>("blogs").find().sort({ updatedAt: -1 }).toArray()).map(toDto);
}

export async function getAdminBlog(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const post = await db.collection<BlogRecord>("blogs").findOne({ _id: new ObjectId(id) });
  return post ? toDto(post) : null;
}

export async function listPublishedBlogs() {
  if (!process.env.MONGODB_URI?.trim()) return [];
  const db = await getDb();
  return (await db.collection<BlogRecord>("blogs").find({ status: "published" }).sort({ publishedAt: -1 }).toArray()).map(toDto);
}

export const getPublishedBlog = cache(async (slug: string) => {
  if (!process.env.MONGODB_URI?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 180) return null;
  const db = await getDb();
  const post = await db.collection<BlogRecord>("blogs").findOne({ slug, status: "published" });
  return post ? { ...toDto(post), bodyHtml: cleanBlogHtml(post.bodyHtml) } : null;
});

export function dtoToCard(post: BlogDto): DemoBlogPost {
  return {
    slug: post.slug, category: post.category,
    date: (post.publishedAt || post.updatedAt).toISOString(), displayDate: post.displayDate, readTime: post.readTime,
    title: post.title, subtitle: post.subtitle, image: post.featuredImage, imageAlt: post.imageAlt,
    author: post.authorName, authorRole: "Cyber-I Editorial Desk", sections: [],
  };
}

export function getDemoPost(slug: string) {
  return listDemoPosts().find((post) => post.slug === slug);
}

export function listDemoPosts() {
  return !process.env.MONGODB_URI?.trim() || process.env.SHOW_DEMO_BLOGS === "true" ? demoBlogPosts : [];
}
