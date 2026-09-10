import type { Metadata } from "next";
import {
  Container,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { pendente, profissionais } from "@/config/escritorio";
import { jsonLdBreadcrumb } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Profissionais",
  description:
    "Os profissionais responsáveis pela condução dos casos no Santos & Suzuki Advocacia.",
  alternates: { canonical: "/profissionais" },
};

/** Iniciais do nome, usadas no retrato tipográfico quando não há fotografia. */
function iniciais(nome: string): string {
  if (pendente(nome)) return "&";
  return nome
    .split(/\s+/)
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ProfissionaisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "Profissionais", href: "/profissionais" },
            ]),
          ),
        }}
      />

      <Secao className="pt-16 md:pt-24">
        <Container>
          <RotuloSecao>Profissionais</RotuloSecao>
          <Prosa>
            <Titulo nivel={1}>
              Quem define a estratégia é quem conduz o caso.
            </Titulo>
            <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
              O envolvimento direto dos sócios em cada situação é uma condição
              de trabalho, não um diferencial de apresentação. É o que sustenta
              o limite deliberado no número de casos simultâneos.
            </p>
          </Prosa>

          <ul className="mt-16 grid gap-px border border-borda bg-borda md:grid-cols-2">
            {profissionais.map((p) => (
              <li key={p.slug} className="bg-superficie p-8 md:p-10">
                {/* Retrato tipográfico — substituir por fotografia quando houver. */}
                <div
                  aria-hidden
                  className="superficie-escura flex aspect-[4/5] w-full max-w-[13rem] items-center justify-center bg-petroleo"
                >
                  <span className="font-display text-4xl text-limao">
                    {iniciais(p.nome)}
                  </span>
                </div>
                <h2 className="font-display mt-8 text-xl tracking-[-0.01em]">
                  {p.nome}
                </h2>
                <p className="mt-2 text-sm text-tinta-suave">
                  {p.cargo}
                  <span aria-hidden> · </span>
                  {p.oab}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-tinta-suave">
                  {p.bio}
                </p>
                {p.formacao.length > 0 && (
                  <>
                    <h3 className="mt-8 text-xs font-medium tracking-[0.18em] text-tinta-suave uppercase">
                      Formação
                    </h3>
                    <ul className="mt-3 space-y-1 text-sm text-tinta-suave">
                      {p.formacao.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-sm text-tinta-suave">
            Os dados de inscrição na OAB e as informações profissionais completas
            constam do rodapé deste site.
          </p>
        </Container>
      </Secao>
    </>
  );
}
