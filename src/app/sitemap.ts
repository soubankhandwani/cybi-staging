import type { MetadataRoute } from "next";
import { academyCourses } from "@/components/academy/academy-data";
import { listDemoPosts, listPublishedBlogs } from "@/lib/server/blogs";
import { SITE_URL } from "@/lib/seo";

const staticRoutes = ["", "/about", "/services", "/courses", "/clients", "/blog", "/gallery", "/contact"];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedBlogs();
  const publishedSlugs = new Set(posts.map((post) => post.slug));

  return [
    ...staticRoutes.map((route, index) => ({
      url: `${SITE_URL}${route}`,
      changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
    {
      url: `${SITE_URL}/services/cyber-crime-investigation`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...academyCourses.map((course) => ({
      url: `${SITE_URL}/courses/${course.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
    ...listDemoPosts().filter((post) => !publishedSlugs.has(post.slug)).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
