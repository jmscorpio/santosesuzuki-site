import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  LinkFilete,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { pilarPorSlug, pilares } from "@/content/atuacao";
import { jsonLdBreadcrumb } from "@/lib/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pilares.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pilar = pilarPorSlug(slug);
  if (!pilar) return {};
  return {
    title: pilar.tituloCurto,
    description: pilar.resumo,
    alternates: { canonical: `/atuacao/${pilar.slug}` },
    openGraph: { title: pilar.titulo, description: pilar.resumo },
  };
}

export default async function PilarPage({ params }: Props) {
  const { slug } = await params;
  const pilar = pilarPorSlug(slug);
  if (!pilar) notFound();

  const outros = pilares.filter((p) => p.slug !== pilar.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "Atuação", href: "/atuacao" },
              { nome: pilar.tituloCurto, href: `/atuacao/${pilar.slug}` },
            ]),
          ),
        }}
      />

      <Secao className="pt-16 pb-0 md:pt-24">
        <Container>
          <nav aria-label="Trilha de navegação" className="mb-10 text-sm">
            <Link href="/atuacao" className="text-tinta-suave hover:text-petroleo">
              ← Atuação
            </Link>
          </nav>
          <Prosa>
            <Titulo nivel={1}>{pilar.titulo}</Titulo>
            <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
              {pilar.abertura}
            </p>
          </Prosa>
        </Container>
      </Secao>

      <Secao>
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <RotuloSecao>Situações típicas</RotuloSecao>
              <p className="max-w-xs text-sm leading-relaxed text-tinta-suave">
                Circunstâncias em que esse tipo de trabalho costuma ser
                procurado.
              </p>
            </div>
            <ul className="border-t border-borda">
              {pilar.situacoes.map((s) => (
                <li
                  key={s}
                  className="flex gap-4 border-b border-borda py-5 text-tinta-suave"
                >
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-limao" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Secao>

      <Secao escura>
        <Container>
          <RotuloSecao escuro>Como atuamos</RotuloSecao>
          <Prosa>
            <p className="text-lg leading-relaxed text-white/80">
              {pilar.atuacao}
            </p>
            <div className="mt-10">
              <LinkFilete href="/contato" escuro>
                Falar com o escritório
              </LinkFilete>
            </div>
          </Prosa>
        </Container>
      </Secao>

      <Secao>
        <Container>
          <RotuloSecao>Outras frentes</RotuloSecao>
          <ul className="grid gap-px border border-borda bg-borda md:grid-cols-3">
            {outros.map((p) => (
              <li key={p.slug} className="bg-superficie">
                <Link
                  href={`/atuacao/${p.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-base"
                >
                  <span aria-hidden className="mb-5 h-px w-8 bg-limao" />
                  <h2 className="font-display text-lg leading-snug tracking-[-0.01em]">
                    {p.tituloCurto}
                  </h2>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-petroleo">
                    Ver
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
    </>
  );
}
