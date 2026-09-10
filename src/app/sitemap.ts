import type { MetadataRoute } from "next";
import { escritorio } from "@/config/escritorio";
import { pilares } from "@/content/atuacao";
import { listarInsights } from "@/lib/insights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = escritorio.url;
  const agora = new Date();

  const fixas: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/o-escritorio`, lastModified: agora, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/atuacao`, lastModified: agora, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/profissionais`, lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/insights`, lastModified: agora, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contato`, lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/politica-de-privacidade`, lastModified: agora, changeFrequency: "yearly", priority: 0.3 },
  ];

  const atuacao: MetadataRoute.Sitemap = pilares.map((p) => ({
    url: `${base}/atuacao/${p.slug}`,
    lastModified: agora,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const insights: MetadataRoute.Sitemap = (await listarInsights()).map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: new Date(`${a.data}T12:00:00`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...fixas, ...atuacao, ...insights];
}
