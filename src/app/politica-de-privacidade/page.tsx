import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, RotuloSecao, Secao, Titulo } from "@/components/primitivos";
import { escritorio, pendente } from "@/config/escritorio";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Santos & Suzuki Advocacia trata os dados pessoais coletados por este site, nos termos da Lei nº 13.709/2018 (LGPD).",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

const ATUALIZADA_EM = "10 de setembro de 2026";

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

export default function PoliticaPage() {
  const { endereco, encarregadoLGPD } = escritorio;
  const enderecoCompleto = pendente(endereco.cep)
    ? `${endereco.logradouro}, ${endereco.cidade}/${endereco.uf}`
    : `${endereco.logradouro}, ${endereco.cep}, ${endereco.cidade}/${endereco.uf}`;

  return (
    <Secao className="pt-16 md:pt-24">
      <Container>
        <RotuloSecao>Política de Privacidade</RotuloSecao>
        <div className="max-w-[44rem]">
          <Titulo nivel={1}>
            Como tratamos os dados pessoais coletados neste site.
          </Titulo>
          <p className="mt-6 text-sm text-tinta-suave">
            Última atualização: {ATUALIZADA_EM}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-tinta-suave">
            Esta política descreve o tratamento de dados pessoais realizado pelo{" "}
            {escritorio.nomeCompleto} em razão do uso deste site, nos termos da
            Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais.
          </p>

          <Artigo titulo="1. Controlador">
            <p>
              O controlador dos dados pessoais tratados neste site é o{" "}
              {escritorio.nomeCompleto}
              {!pendente(escritorio.cnpj) && `, inscrito no CNPJ sob o nº ${escritorio.cnpj}`}
              , com endereço em {enderecoCompleto}.
            </p>
          </Artigo>

          <Artigo titulo="2. Encarregado pelo tratamento de dados">
            <p>
              Comunicações sobre proteção de dados devem ser dirigidas ao
              encarregado{" "}
              {pendente(encarregadoLGPD.nome) ? "" : `(${encarregadoLGPD.nome})`}
              , pelo endereço{" "}
              {pendente(encarregadoLGPD.email)
                ? escritorio.email
                : encarregadoLGPD.email}
              .
            </p>
          </Artigo>

          <Artigo titulo="3. Dados coletados">
            <p>
              Este site coleta apenas os dados que o próprio titular informa no
              formulário de contato: nome, endereço de e-mail e, quando
              preenchidos, empresa ou organização e telefone, além do assunto
              selecionado e do conteúdo da mensagem.
            </p>
            <p>
              Registramos também a data e a hora do consentimento, para fins de
              comprovação, e o endereço IP da requisição, utilizado
              exclusivamente para limitar envios automatizados abusivos.
            </p>
            <p>
              Não utilizamos cookies de análise, de publicidade ou de
              rastreamento, e não empregamos ferramentas de terceiros que
              acompanhem a navegação entre sites.
            </p>
          </Artigo>

          <Artigo titulo="4. Finalidade e base legal">
            <p>
              Os dados informados no formulário são tratados com a finalidade
              exclusiva de responder ao contato realizado e, se for o caso, dar
              seguimento à tratativa iniciada pelo titular.
            </p>
            <p>
              A base legal é o consentimento do titular, manifestado de forma
              expressa no envio do formulário (art. 7º, I, da LGPD). Os
              registros técnicos de acesso são tratados com fundamento no
              legítimo interesse de proteger o site contra uso abusivo (art. 7º,
              IX).
            </p>
          </Artigo>

          <Artigo titulo="5. Compartilhamento">
            <p>
              Os dados não são vendidos, cedidos ou compartilhados para
              finalidade comercial. O tratamento envolve apenas os prestadores
              de serviço necessários à operação do site — hospedagem e envio de
              e-mail — que atuam como operadores e ficam limitados às instruções
              do controlador.
            </p>
            <p>
              Poderá haver compartilhamento quando exigido por autoridade
              competente ou por determinação legal ou judicial.
            </p>
          </Artigo>

          <Artigo titulo="6. Retenção">
            <p>
              As mensagens recebidas são mantidas pelo período necessário ao
              atendimento do contato. Quando o contato não evolui para relação
              profissional, os dados são eliminados em até 12 meses, salvo
              obrigação legal de guarda por prazo diverso.
            </p>
            <p>
              Estabelecida a relação profissional, o tratamento passa a
              observar as normas aplicáveis ao exercício da advocacia,
              inclusive quanto ao sigilo profissional e aos prazos de guarda de
              documentos.
            </p>
          </Artigo>

          <Artigo titulo="7. Segurança">
            <p>
              Adotamos medidas técnicas e administrativas para proteger os dados
              contra acesso não autorizado, perda ou alteração indevida. O
              tráfego do site é integralmente cifrado.
            </p>
          </Artigo>

          <Artigo titulo="8. Direitos do titular">
            <p>
              Nos termos do art. 18 da LGPD, o titular pode requerer, a qualquer
              momento: confirmação da existência de tratamento; acesso aos
              dados; correção de dados incompletos, inexatos ou desatualizados;
              anonimização, bloqueio ou eliminação de dados desnecessários,
              excessivos ou tratados em desconformidade com a lei;
              portabilidade; eliminação dos dados tratados com base no
              consentimento; informação sobre compartilhamento; informação sobre
              a possibilidade de não consentir e suas consequências; e revogação
              do consentimento.
            </p>
            <p>
              As solicitações devem ser encaminhadas ao endereço indicado no
              item 2 e serão respondidas nos prazos legais.
            </p>
          </Artigo>

          <Artigo titulo="9. Alterações desta política">
            <p>
              Esta política pode ser atualizada para refletir mudanças
              normativas ou operacionais. A data da última atualização consta no
              início do documento.
            </p>
          </Artigo>
        </div>
      </Container>
    </Secao>
  );
}
