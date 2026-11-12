import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Cyber-I",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#152334",
    icons: [
      {
        src: "/images/brand/cyber-i-site-icon-2026.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
