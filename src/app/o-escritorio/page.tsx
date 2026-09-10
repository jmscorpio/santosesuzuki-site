import type { Metadata } from "next";
import {
  Container,
  LinkFilete,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { metodologia } from "@/content/home";
import { jsonLdBreadcrumb } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "O Escritório",
  description:
    "Banca de advocacia empresarial em Curitiba, com atuação concentrada em reestruturações, negociações e litígios de alta complexidade.",
  alternates: { canonical: "/o-escritorio" },
};

const principios = [
  {
    titulo: "Número reduzido de casos",
    texto:
      "A quantidade de trabalho em curso é limitada de propósito. É o que permite que quem define a estratégia seja quem conduz o caso até o fim.",
  },
  {
    titulo: "Decisão antes de peça",
    texto:
      "Nenhuma manifestação relevante é redigida antes de a estratégia estar definida e os cenários alternativos estarem explicitados ao cliente.",
  },
  {
    titulo: "Leitura econômica do problema",
    texto:
      "Situações de crise e reestruturação são lidas junto com os números. O trabalho é feito em articulação com os assessores financeiros e contábeis da empresa.",
  },
  {
    titulo: "Clareza sobre o que é incerto",
    texto:
      "Cenário processual é cenário, não previsão. O que é incerto é apresentado como incerto, com as variáveis que podem alterá-lo.",
  },
];

export default function OEscritorioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "O Escritório", href: "/o-escritorio" },
            ]),
          ),
        }}
      />

      <Secao className="pt-16 md:pt-24">
        <Container>
          <RotuloSecao>O Escritório</RotuloSecao>
          <Prosa>
            <Titulo nivel={1}>
              Uma banca organizada em torno de situações empresariais críticas.
            </Titulo>
            <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
              O Santos &amp; Suzuki é um escritório de advocacia empresarial
              sediado em Curitiba, com atuação concentrada em reestruturações,
              negociações complexas e litígios de impacto relevante para a
              operação ou o patrimônio das empresas que atende.
            </p>
            <p className="mt-5 text-tinta-suave">
              A estrutura é pensada para esse tipo de trabalho: equipe enxuta,
              volume limitado de casos simultâneos e envolvimento direto dos
              sócios em cada situação. Não atuamos como escritório generalista
              nem como banca de volume.
            </p>
            <p className="mt-5 text-tinta-suave">
              Atendemos empresários, diretorias jurídicas e financeiras,
              credores, investidores, administradores judiciais, contadores e
              escritórios que precisam de apoio técnico em uma frente
              específica.
            </p>
          </Prosa>
        </Container>
      </Secao>

      <Secao className="bg-superficie">
        <Container>
          <RotuloSecao>Como trabalhamos</RotuloSecao>
          <Prosa className="mb-14">
            <Titulo nivel={2}>Quatro princípios de condução.</Titulo>
          </Prosa>
          <ul className="grid gap-px border border-borda bg-borda md:grid-cols-2">
            {principios.map((p) => (
              <li key={p.titulo} className="bg-superficie p-8 md:p-10">
                <span aria-hidden className="mb-6 block h-px w-8 bg-limao" />
                <h3 className="font-display text-lg tracking-[-0.01em]">
                  {p.titulo}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-tinta-suave">
                  {p.texto}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Secao>

      <Secao escura>
        <Container>
          <RotuloSecao escuro>Metodologia</RotuloSecao>
          <Prosa>
            <Titulo nivel={2}>
              A mesma sequência, do primeiro contato ao encerramento.
            </Titulo>
          </Prosa>
          <ol className="mt-14 grid gap-px bg-white/12 md:grid-cols-4">
            {metodologia.map((m, i) => (
              <li key={m.etapa} className="bg-petroleo p-8">
                <span
                  aria-hidden
                  className="font-display text-sm text-limao tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-lg">{m.etapa}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {m.texto}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <LinkFilete href="/atuacao" escuro>
              Ver as frentes de atuação
            </LinkFilete>
          </div>
        </Container>
      </Secao>
    </>
  );
}
