import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { getAdminBlog } from "@/lib/server/blogs";
import { requireAdmin } from "@/lib/server/auth";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const blog = await getAdminBlog((await params).id);
  if (!blog) notFound();
  return <BlogForm initial={{ id: blog.id, title: blog.title, subtitle: blog.subtitle, slug: blog.slug, category: blog.category, featuredImage: blog.featuredImage, imageAlt: blog.imageAlt, bodyHtml: blog.bodyHtml, status: blog.status, revision: blog.updatedAt.toISOString() }} />;
}

