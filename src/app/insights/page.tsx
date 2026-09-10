import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { formatarData, listarInsights } from "@/lib/insights";
import { jsonLdBreadcrumb } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Textos de caráter informativo sobre reestruturação, contencioso empresarial e negociação, escritos pelo Santos & Suzuki Advocacia.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const artigos = await listarInsights();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "Insights", href: "/insights" },
            ]),
          ),
        }}
      />

      <Secao className="pt-16 md:pt-24">
        <Container>
          <RotuloSecao>Insights</RotuloSecao>
          <Prosa>
            <Titulo nivel={1}>
              Notas técnicas sobre os temas em que trabalhamos.
            </Titulo>
            <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
              Textos de caráter informativo, sem análise de caso concreto. São
              escritos a partir de questões que aparecem com frequência nas
              situações que acompanhamos.
            </p>
          </Prosa>

          {artigos.length === 0 ? (
            <p className="mt-16 text-tinta-suave">
              Nenhum texto publicado até o momento.
            </p>
          ) : (
            <ul className="mt-16 border-t border-borda">
              {artigos.map((a) => (
                <li key={a.slug} className="border-b border-borda">
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group grid gap-4 py-10 md:grid-cols-[11rem_1fr] md:gap-10"
                  >
                    <div className="text-sm text-tinta-suave">
                      <time dateTime={a.data}>{formatarData(a.data)}</time>
                      <p className="mt-1">{a.minutosLeitura} min de leitura</p>
                    </div>
                    <div>
                      <h2 className="font-display max-w-2xl text-xl leading-snug tracking-[-0.01em] text-balance transition-colors group-hover:text-petroleo-claro md:text-2xl">
                        {a.titulo}
                      </h2>
                      <p className="mt-4 max-w-2xl text-tinta-suave">
                        {a.descricao}
                      </p>
                      {a.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {a.tags.map((t) => (
                            <li
                              key={t}
                              className="border border-borda px-3 py-1 text-xs tracking-wide text-tinta-suave"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Secao>
    </>
  );
}
