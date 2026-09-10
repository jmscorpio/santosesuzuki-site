import type { MetadataRoute } from "next";
import { escritorio } from "@/config/escritorio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${escritorio.url}/sitemap.xml`,
    host: escritorio.url,
  };
}
