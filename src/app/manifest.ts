import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cyber-I Consultancy",
    short_name: "Cyber-I",
    description: "Information analysis, cyber investigations, digital forensics, training, and strategic advisory.",
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
