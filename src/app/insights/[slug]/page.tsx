import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Secao } from "@/components/primitivos";
import { componentesMdx } from "@/components/mdx";
import { formatarData, listarInsights, obterInsight } from "@/lib/insights";
import { jsonLdArtigo, jsonLdBreadcrumb } from "@/lib/json-ld";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const artigos = await listarInsights();
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await obterInsight(slug);
  if (!artigo) return {};
  return {
    title: artigo.titulo,
    description: artigo.descricao,
    alternates: { canonical: `/insights/${artigo.slug}` },
    openGraph: {
      type: "article",
      title: artigo.titulo,
      description: artigo.descricao,
      publishedTime: artigo.data,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const artigo = await obterInsight(slug);
  if (!artigo) notFound();

  const outros = (await listarInsights())
    .filter((a) => a.slug !== artigo.slug)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdArtigo({
              titulo: artigo.titulo,
              descricao: artigo.descricao,
              data: artigo.data,
              slug: artigo.slug,
              autor: artigo.autor,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "Insights", href: "/insights" },
              { nome: artigo.titulo, href: `/insights/${artigo.slug}` },
            ]),
          ),
        }}
      />

      <article>
        <Secao className="pt-16 pb-0 md:pt-24">
          <Container>
            <nav aria-label="Trilha de navegação" className="mb-10 text-sm">
              <Link
                href="/insights"
                className="text-tinta-suave hover:text-petroleo"
              >
                ← Insights
              </Link>
            </nav>
            <div className="max-w-[44rem]">
              <p className="text-sm text-tinta-suave">
                <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
                <span aria-hidden> · </span>
                {artigo.minutosLeitura} min de leitura
              </p>
              <h1
                className="font-display mt-6 text-3xl font-normal tracking-[-0.02em] text-balance md:text-4xl"
                style={{ lineHeight: 1.15 }}
              >
                {artigo.titulo}
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
                {artigo.descricao}
              </p>
              <p className="mt-8 border-t border-borda pt-6 text-sm text-tinta-suave">
                {artigo.autor}
              </p>
            </div>
          </Container>
        </Secao>

        <Secao className="pt-12 md:pt-16">
          <Container>
            <div className="max-w-[42rem]">
              <MDXRemote source={artigo.conteudo} components={componentesMdx} />
            </div>
          </Container>
        </Secao>
      </article>

      {outros.length > 0 && (
        <Secao className="bg-superficie">
          <Container>
            <h2 className="mb-10 text-xs font-medium tracking-[0.18em] text-tinta-suave uppercase">
              Outros textos
            </h2>
            <ul className="grid gap-px border border-borda bg-borda md:grid-cols-2">
              {outros.map((a) => (
                <li key={a.slug} className="bg-superficie">
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group flex h-full flex-col p-8"
                  >
                    <p className="text-xs text-tinta-suave">
                      <time dateTime={a.data}>{formatarData(a.data)}</time>
                    </p>
                    <h3 className="font-display mt-4 text-lg leading-snug tracking-[-0.01em] text-balance">
                      {a.titulo}
                    </h3>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm text-petroleo">
                      Ler
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Secao>
      )}
    </>
  );
}
