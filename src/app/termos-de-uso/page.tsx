import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, RotuloSecao, Secao, Titulo } from "@/components/primitivos";
import { escritorio, pendente } from "@/config/escritorio";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições de uso do site do Santos & Suzuki Advocacia: objeto, propriedade intelectual, limitação de responsabilidade e foro.",
  alternates: { canonical: "/termos-de-uso" },
  robots: { index: true, follow: true },
};

const ATUALIZADO_EM = "10 de setembro de 2026";

function Artigo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl tracking-[-0.01em]">{titulo}</h2>
      <div className="mt-4 space-y-4 leading-[1.75] text-tinta-suave">
        {children}
      </div>
    </section>
  );
}

export default function TermosDeUsoPage() {
  const { endereco } = escritorio;
  const enderecoCompleto = pendente(endereco.cep)
    ? `${endereco.logradouro}, ${endereco.cidade}/${endereco.uf}`
    : `${endereco.logradouro}, ${endereco.cep}, ${endereco.cidade}/${endereco.uf}`;

  return (
    <Secao className="pt-16 md:pt-24">
      <Container>
        <RotuloSecao>Termos de Uso</RotuloSecao>
        <div className="max-w-[44rem]">
          <Titulo nivel={1}>Condições de uso deste site.</Titulo>
          <p className="mt-6 text-sm text-tinta-suave">
            Última atualização: {ATUALIZADO_EM}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
            Estes Termos de Uso regem o acesso e a utilização do site do{" "}
            {escritorio.nomeCompleto}. Ao navegar neste site, o visitante
            concorda com as condições descritas a seguir.
          </p>

          <Artigo titulo="1. Aceitação">
            <p>
              O uso deste site implica a aceitação integral destes Termos de
              Uso. Quem não concordar com alguma condição aqui descrita deve
              interromper a navegação.
            </p>
          </Artigo>

          <Artigo titulo="2. Objeto">
            <p>
              Este site tem finalidade exclusivamente informativa: apresenta
              as áreas de atuação do {escritorio.nomeCompleto}, os
              profissionais do escritório e conteúdo editorial sobre temas
              jurídicos (seção Insights).
            </p>
            <p>
              O conteúdo publicado não constitui consulta jurídica, parecer
              ou aconselhamento sobre caso concreto, e não deve ser usado
              como substituto de orientação jurídica individualizada. Nenhuma
              informação deste site configura oferta de serviços ou
              publicidade de resultados, em conformidade com o Código de
              Ética e Disciplina da OAB e com o Provimento CFOAB nº 205/2021.
            </p>
            <p>
              O envio do formulário de contato não estabelece, por si só,
              relação de cliente ou qualquer vínculo de representação. A
              relação profissional só se forma mediante contratação
              expressa, observadas as normas da advocacia.
            </p>
          </Artigo>

          <Artigo titulo="3. Propriedade intelectual">
            <p>
              Os textos, artigos, marca, logotipo e demais elementos visuais
              deste site pertencem ao {escritorio.nomeCompleto} ou são
              utilizados sob licença, e são protegidos pela Lei nº
              9.610/1998 (Lei de Direitos Autorais).
            </p>
            <p>
              É permitida a citação de trechos dos artigos publicados, com
              indicação da fonte e link para o conteúdo original. Qualquer
              outra forma de reprodução, distribuição ou uso comercial
              depende de autorização prévia e expressa.
            </p>
          </Artigo>

          <Artigo titulo="4. Uso adequado">
            <p>
              O visitante compromete-se a não utilizar este site para
              finalidade ilícita, para tentar obter acesso não autorizado a
              sistemas do escritório, ou para envio automatizado de
              mensagens em volume anormal através do formulário de contato.
            </p>
          </Artigo>

          <Artigo titulo="5. Limitação de responsabilidade">
            <p>
              O conteúdo editorial deste site reflete o entendimento da
              equipe na data de publicação e pode não refletir alterações
              legislativas ou jurisprudenciais posteriores. O{" "}
              {escritorio.nomeCompleto} não garante que o conteúdo esteja
              permanentemente atualizado nem se responsabiliza por decisões
              tomadas com base exclusivamente nas informações aqui
              publicadas, sem orientação jurídica específica sobre o caso
              concreto.
            </p>
            <p>
              O {escritorio.nomeCompleto} também não se responsabiliza por
              indisponibilidade temporária do site decorrente de fatores
              fora de seu controle, nem pelo conteúdo de sites de terceiros
              eventualmente linkados.
            </p>
          </Artigo>

          <Artigo titulo="6. Privacidade">
            <p>
              O tratamento de dados pessoais coletados por este site é
              descrito na{" "}
              <a
                href="/politica-de-privacidade"
                className="underline decoration-limao/60 underline-offset-2 transition-colors hover:text-tinta"
              >
                Política de Privacidade
              </a>
              , parte integrante destes Termos de Uso.
            </p>
          </Artigo>

          <Artigo titulo="7. Alterações destes termos">
            <p>
              Estes Termos de Uso podem ser atualizados a qualquer momento,
              para refletir mudanças no site ou na legislação aplicável. A
              data da última atualização consta no início deste documento.
            </p>
          </Artigo>

          <Artigo titulo="8. Foro">
            <p>
              Fica eleito o foro da comarca de Curitiba/PR para dirimir
              qualquer controvérsia decorrente destes Termos de Uso, com
              renúncia a qualquer outro, por mais privilegiado que seja.
            </p>
          </Artigo>

          <Artigo titulo="9. Contato">
            <p>
              Dúvidas sobre estes Termos de Uso podem ser encaminhadas para{" "}
              <a
                href={`mailto:${escritorio.email}`}
                className="underline decoration-limao/60 underline-offset-2 transition-colors hover:text-tinta"
              >
                {escritorio.email}
              </a>{" "}
              ou para o endereço {enderecoCompleto}.
            </p>
          </Artigo>
        </div>
      </Container>
    </Secao>
  );
}
