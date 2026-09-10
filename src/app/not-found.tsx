import Link from "next/link";
import { Container, Secao, Titulo } from "@/components/primitivos";

export default function NaoEncontrado() {
  return (
    <Secao className="py-32 md:py-40">
      <Container>
        <div className="max-w-xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-tinta-suave uppercase">
            <span aria-hidden className="h-px w-8 bg-limao" />
            Erro 404
          </p>
          <Titulo nivel={1}>Página não encontrada.</Titulo>
          <p className="mt-6 text-tinta-suave">
            O endereço acessado não existe ou foi alterado.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 border-b border-petroleo/25 pb-1 text-sm text-petroleo transition-colors hover:border-petroleo"
          >
            Voltar ao início
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </Secao>
  );
}
