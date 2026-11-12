import "server-only";

import { z } from "zod";
import { IMAGE_PATH } from "@/lib/server/blog-media";

export const emailSchema = z.string().trim().email().max(254);
export const passwordSchema = z.string().min(12).max(128)
  .regex(/[a-z]/, "Include a lowercase letter.")
  .regex(/[A-Z]/, "Include an uppercase letter.")
  .regex(/[0-9]/, "Include a number.")
  .regex(/[^A-Za-z0-9]/, "Include a symbol.");

export const blogSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters.").max(180, "Title must be 180 characters or fewer."),
  subtitle: z.string().trim().min(10, "Subtitle must be at least 10 characters.").max(320, "Subtitle must be 320 characters or fewer."),
  slug: z.string().trim().min(3, "URL slug must be at least 3 characters.").max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens in the URL slug."),
  category: z.string().trim().min(2, "Category is required.").max(60).default("Insights"),
  featuredImage: z.string().trim().max(200).regex(IMAGE_PATH, "Upload a featured image before saving."),
  imageAlt: z.string().trim().min(5, "Featured image alt text must be at least 5 characters.").max(180),
  bodyHtml: z.string().min(20, "Add more content to the article body.").max(500_000),
  status: z.enum(["draft", "published"]),
  revision: z.iso.datetime().optional(),
});
