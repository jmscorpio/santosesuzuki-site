import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "insights");

export type Insight = {
  slug: string;
  titulo: string;
  descricao: string;
  data: string;
  autor: string;
  tags: string[];
  rascunho: boolean;
  minutosLeitura: number;
};

export type InsightCompleto = Insight & { conteudo: string };

type Frontmatter = {
  titulo?: string;
  descricao?: string;
  data?: string;
  autor?: string;
  tags?: string[];
  rascunho?: boolean;
};

function minutos(texto: string): number {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palavras / 200));
}

function montar(slug: string, cru: string): InsightCompleto {
  const { data, content } = matter(cru);
  const fm = data as Frontmatter;

  if (!fm.titulo) throw new Error(`Insight "${slug}": frontmatter sem "titulo".`);
  if (!fm.data) throw new Error(`Insight "${slug}": frontmatter sem "data".`);

  return {
    slug,
    titulo: fm.titulo,
    descricao: fm.descricao ?? "",
    data: fm.data,
    autor: fm.autor ?? "Santos & Suzuki Advocacia",
    tags: fm.tags ?? [],
    rascunho: fm.rascunho ?? false,
    minutosLeitura: minutos(content),
    conteudo: content,
  };
}

/** Rascunhos aparecem em desenvolvimento e nunca em produção. */
function visivel(a: Insight): boolean {
  return !a.rascunho || process.env.NODE_ENV === "development";
}

export async function listarInsights(): Promise<Insight[]> {
  let arquivos: string[];
  try {
    arquivos = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const artigos = await Promise.all(
    arquivos
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const slug = f.replace(/\.mdx$/, "");
        const cru = await fs.readFile(path.join(DIR, f), "utf8");
        const completo = montar(slug, cru);
        delete (completo as Partial<InsightCompleto>).conteudo;
        return completo as Insight;
      }),
  );

  return artigos
    .filter(visivel)
    .sort((a, b) => b.data.localeCompare(a.data));
}

export async function obterInsight(
  slug: string,
): Promise<InsightCompleto | null> {
  try {
    const cru = await fs.readFile(path.join(DIR, `${slug}.mdx`), "utf8");
    const artigo = montar(slug, cru);
    return visivel(artigo) ? artigo : null;
  } catch {
    return null;
  }
}

export function formatarData(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
