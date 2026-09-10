import Link from "next/link";
import {
  Container,
  LinkFilete,
  Prosa,
  RotuloSecao,
  Secao,
  Titulo,
} from "@/components/primitivos";
import { CartaoInsight } from "@/components/cartao-insight";
import { pilares } from "@/content/atuacao";
import {
  competenciasSuporte,
  mensagemCentral,
  metodologia,
  quandoAtuamos,
  subtitulo,
} from "@/content/home";
import { listarInsights } from "@/lib/insights";

export default async function Home() {
  const recentes = (await listarInsights()).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="superficie-escura relative overflow-hidden bg-petroleo text-white">
        <MarcaDaguaArquitetonica />
        <Container className="relative">
          <div className="animar-entrada flex min-h-[78vh] flex-col justify-center py-24 md:min-h-[82vh]">
            <p className="mb-8 flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-limao uppercase">
              <span aria-hidden className="h-px w-8 bg-limao" />
              Curitiba — Paraná
            </p>
            <h1
              className="font-display max-w-4xl text-3xl font-normal tracking-[-0.02em] text-balance md:text-4xl"
              style={{ lineHeight: 1.12 }}
            >
              {mensagemCentral}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              {subtitulo}
            </p>
            <div className="mt-12">
              <LinkFilete href="/atuacao" escuro>
                Conheça nossa atuação
              </LinkFilete>
            </div>
          </div>
        </Container>
      </section>

      {/* Quando atuamos */}
      <Secao>
        <Container>
          <RotuloSecao>Quando atuamos</RotuloSecao>
          <Prosa>
            <Titulo nivel={2}>
              Situações em que a decisão jurídica define o rumo da empresa.
            </Titulo>
          </Prosa>
          <ol className="mt-14 border-t border-borda">
            {quandoAtuamos.map((item, i) => (
              <li
                key={item.titulo}
                className="grid gap-3 border-b border-borda py-7 md:grid-cols-[4rem_1fr_1.5fr] md:items-baseline md:gap-8"
              >
                <span
                  aria-hidden
                  className="font-display text-sm text-petroleo/45 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl tracking-[-0.01em]">
                  {item.titulo}
                </h3>
                <p className="text-tinta-suave">{item.texto}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Secao>

      {/* Atuação */}
      <Secao className="bg-superficie">
        <Container>
          <RotuloSecao>Atuação</RotuloSecao>
          <Prosa className="mb-14">
            <Titulo nivel={2}>Quatro frentes, uma forma de trabalhar.</Titulo>
            <p className="mt-6 text-tinta-suave">{competenciasSuporte}</p>
          </Prosa>
          <ul className="grid gap-px overflow-hidden border border-borda bg-borda md:grid-cols-2">
            {pilares.map((p) => (
              <li key={p.slug} className="bg-superficie">
                <Link
                  href={`/atuacao/${p.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-base md:p-10"
                >
                  <span aria-hidden className="mb-6 h-px w-8 bg-limao" />
                  <h3 className="font-display text-xl tracking-[-0.01em]">
                    {p.tituloCurto}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-tinta-suave">
                    {p.resumo}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-petroleo">
                    Ver detalhes
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

      {/* Metodologia */}
      <Secao escura>
        <Container>
          <RotuloSecao escuro>Como conduzimos</RotuloSecao>
          <Prosa>
            <Titulo nivel={2}>
              Diagnóstico, estratégia, execução e acompanhamento.
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
        </Container>
      </Secao>

      {/* Insights */}
      {recentes.length > 0 && (
        <Secao>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <RotuloSecao>Insights</RotuloSecao>
                <Titulo nivel={2}>Publicações recentes</Titulo>
              </div>
              <LinkFilete href="/insights">Ver todos</LinkFilete>
            </div>
            <ul className="mt-14 grid gap-px border border-borda bg-borda md:grid-cols-3">
              {recentes.map((a) => (
                <CartaoInsight key={a.slug} artigo={a} />
              ))}
            </ul>
          </Container>
        </Secao>
      )}
    </>
  );
}

/** Abstração arquitetônica em SVG — sem dependência de imagem externa. */
function MarcaDaguaArquitetonica() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute top-0 right-0 h-full w-[70%] opacity-[0.16]"
      viewBox="0 0 800 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="esmaecer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>
        <mask id="mascara">
          <rect width="800" height="900" fill="url(#esmaecer)" />
        </mask>
      </defs>
      <g mask="url(#mascara)" stroke="#c0cf13" strokeWidth="1">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v${i}`} x1={60 + i * 52} y1="0" x2={60 + i * 52} y2="900" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={70 + i * 78} x2="800" y2={70 + i * 78} />
        ))}
      </g>
      <g mask="url(#mascara)" fill="#c0cf13" opacity="0.5">
        <rect x="164" y="226" width="52" height="78" />
        <rect x="372" y="382" width="52" height="78" />
        <rect x="580" y="148" width="52" height="78" />
        <rect x="268" y="616" width="52" height="78" />
        <rect x="632" y="538" width="52" height="78" />
      </g>
    </svg>
  );
}
