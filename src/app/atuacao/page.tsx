import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { pilares } from "@/content/atuacao";
import { competenciasSuporte } from "@/content/home";
import { jsonLdBreadcrumb } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Atuação",
  description:
    "Quatro frentes de trabalho: reestruturação e recuperação judicial, contencioso empresarial estratégico, negociação e situações especiais, e gestão estratégica de contencioso.",
  alternates: { canonical: "/atuacao" },
};

export default function AtuacaoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "Atuação", href: "/atuacao" },
            ]),
          ),
        }}
      />
      <Secao className="pt-16 md:pt-24">
        <Container>
          <RotuloSecao>Atuação</RotuloSecao>
          <Prosa>
            <Titulo nivel={1}>
              Quatro frentes, definidas pelo tipo de decisão que a empresa
              precisa tomar.
            </Titulo>
            <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
              Não trabalhamos com uma lista extensa de áreas. As frentes abaixo
              se sobrepõem com frequência — uma reestruturação costuma envolver
              litígio, e uma negociação relevante quase sempre nasce de um
              conflito já instalado.
            </p>
            <p className="mt-5 text-tinta-suave">{competenciasSuporte}</p>
          </Prosa>

          <ul className="mt-16 border-t border-borda">
            {pilares.map((p, i) => (
              <li key={p.slug} className="border-b border-borda">
                <Link
                  href={`/atuacao/${p.slug}`}
                  className="group grid gap-4 py-10 transition-colors md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-8"
                >
                  <span
                    aria-hidden
                    className="font-display text-sm text-petroleo/45 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl tracking-[-0.01em] text-balance transition-colors group-hover:text-petroleo-claro md:text-2xl">
                    {p.tituloCurto}
                  </h2>
                  <div>
                    <p className="text-tinta-suave">{p.resumo}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-petroleo">
                      Ver detalhes
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Secao>
    </>
  );
}
