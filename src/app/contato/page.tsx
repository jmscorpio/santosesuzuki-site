import type { Metadata } from "next";
import {
  Container,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { FormularioContato } from "@/components/formulario-contato";
import { escritorio, pendente } from "@/config/escritorio";
import { jsonLdBreadcrumb } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Santos & Suzuki Advocacia. Rua Simão Bolivar, 897 — Curitiba/PR.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const { endereco } = escritorio;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { nome: "Início", href: "/" },
              { nome: "Contato", href: "/contato" },
            ]),
          ),
        }}
      />

      <Secao className="pt-16 md:pt-24">
        <Container>
          <RotuloSecao>Contato</RotuloSecao>
          <Prosa>
            <Titulo nivel={1}>Fale com o escritório.</Titulo>
            <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
              Descreva a situação em linhas gerais. O retorno é feito pelo mesmo
              canal, e um primeiro contato não estabelece relação profissional
              nem gera obrigação para nenhuma das partes.
            </p>
          </Prosa>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <h2 className="text-xs font-medium tracking-[0.18em] text-tinta-suave uppercase">
                Escritório
              </h2>
              <address className="mt-6 space-y-5 text-tinta-suave not-italic">
                <p>
                  {endereco.logradouro}
                  <br />
                  {!pendente(endereco.cep) && (
                    <>
                      {endereco.cep}
                      <br />
                    </>
                  )}
                  {endereco.cidade}/{endereco.uf}
                </p>
                <p>
                  <a
                    href={`tel:${escritorio.telefoneE164}`}
                    className="border-b border-petroleo/25 text-petroleo transition-colors hover:border-petroleo"
                  >
                    {escritorio.telefone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${escritorio.email}`}
                    className="border-b border-petroleo/25 text-petroleo transition-colors hover:border-petroleo"
                  >
                    {escritorio.email}
                  </a>
                </p>
                {!pendente(escritorio.horarioAtendimento) && (
                  <p>{escritorio.horarioAtendimento}</p>
                )}
              </address>

              <p className="mt-10 border-t border-borda pt-6 text-sm leading-relaxed text-tinta-suave">
                Não envie documentos sigilosos ou dados de terceiros neste
                primeiro contato. A troca de documentação é feita depois, por
                canal combinado.
              </p>
            </div>

            <FormularioContato />
          </div>
        </Container>
      </Secao>
    </>
  );
}
