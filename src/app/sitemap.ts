import type { MetadataRoute } from "next";
import { academyCourses } from "@/components/academy/academy-data";
import { blogPosts } from "@/data/editorial-content";
import { SITE_URL } from "@/lib/seo";

const staticRoutes = ["", "/about", "/services", "/courses", "/clients", "/blog", "/gallery", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route, index) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
    {
      url: `${SITE_URL}/services/cyber-crime-investigation`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...academyCourses.map((course) => ({
      url: `${SITE_URL}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
