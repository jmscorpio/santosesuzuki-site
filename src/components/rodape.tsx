import Image from "next/image";
import Link from "next/link";
import { escritorio, pendente } from "@/config/escritorio";
import { pilares } from "@/content/atuacao";
import { Container } from "./primitivos";

/** Só renderiza o dado se ele já tiver sido preenchido. */
function Dado({ valor, prefixo = "" }: { valor: string; prefixo?: string }) {
  if (pendente(valor)) return null;
  return (
    <p>
      {prefixo}
      {valor}
    </p>
  );
}

export function Rodape() {
  const { endereco } = escritorio;
  const linhaEndereco = pendente(endereco.cep)
    ? `${endereco.logradouro} — ${endereco.cidade}/${endereco.uf}`
    : `${endereco.logradouro} — ${endereco.cep} — ${endereco.cidade}/${endereco.uf}`;

  return (
    <footer className="superficie-escura bg-petroleo text-white">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
          <div>
            <Image
              src="/logo/logo-transparente.png"
              alt={escritorio.nomeCompleto}
              width={2010}
              height={515}
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Advocacia empresarial estratégica para reestruturações, negociações
              e conflitos de alta complexidade.
            </p>
          </div>

          <nav aria-label="Áreas de atuação">
            <h2 className="mb-5 text-xs font-medium tracking-[0.18em] text-limao uppercase">
              Atuação
            </h2>
            <ul className="space-y-3 text-sm text-white/70">
              {pilares.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/atuacao/${p.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {p.tituloCurto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-xs font-medium tracking-[0.18em] text-limao uppercase">
              Contato
            </h2>
            <address className="space-y-3 text-sm text-white/70 not-italic">
              <p>{linhaEndereco}</p>
              <p>
                <a
                  href={`tel:${escritorio.telefoneE164}`}
                  className="transition-colors hover:text-white"
                >
                  {escritorio.telefone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${escritorio.email}`}
                  className="transition-colors hover:text-white"
                >
                  {escritorio.email}
                </a>
              </p>
              <Dado valor={escritorio.horarioAtendimento} />
            </address>
          </div>
        </div>

        <div className="border-t border-white/12 py-8">
          <div className="flex flex-col gap-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p>
                © {new Date().getFullYear()} {escritorio.nomeCompleto}
              </p>
              <Dado valor={escritorio.registroOAB} prefixo="OAB/PR " />
              <Dado valor={escritorio.cnpj} prefixo="CNPJ " />
            </div>
            <div className="flex gap-6">
              <Link
                href="/politica-de-privacidade"
                className="transition-colors hover:text-white"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="transition-colors hover:text-white"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/35">
            Conteúdo de caráter meramente informativo, em conformidade com o
            Código de Ética e Disciplina da OAB e com o Provimento CFOAB nº
            205/2021. Este site não constitui oferta de serviços, publicidade
            de resultados ou consulta jurídica sobre caso concreto.
          </p>
        </div>
      </Container>
    </footer>
  );
}
