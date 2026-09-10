import type { ReactNode } from "react";

/** Largura máxima do site. O conteúdo de leitura usa `Prosa`, mais estreito. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** Coluna de texto corrido: ~68 caracteres por linha. */
export function Prosa({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`max-w-[42rem] ${className}`}>{children}</div>;
}

export function Secao({
  children,
  className = "",
  escura = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  escura?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${
        escura ? "superficie-escura bg-petroleo text-white" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

/** Rótulo de seção: filete em limão + texto em caixa alta. */
export function RotuloSecao({
  children,
  escuro = false,
}: {
  children: ReactNode;
  escuro?: boolean;
}) {
  return (
    <p className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase">
      <span aria-hidden className="h-px w-8 bg-limao" />
      <span className={escuro ? "text-limao" : "text-tinta-suave"}>
        {children}
      </span>
    </p>
  );
}

export function Titulo({
  children,
  nivel = 2,
  className = "",
}: {
  children: ReactNode;
  nivel?: 1 | 2 | 3;
  className?: string;
}) {
  const Tag = `h${nivel}` as "h1" | "h2" | "h3";
  const tamanhos = {
    1: "text-3xl md:text-4xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
  } as const;
  return (
    <Tag
      className={`font-display font-normal tracking-[-0.02em] text-balance ${tamanhos[nivel]} ${className}`}
      style={{ lineHeight: 1.15 }}
    >
      {children}
    </Tag>
  );
}

/** CTA discreto: link com filete, nunca botão de destaque. */
export function LinkFilete({
  href,
  children,
  escuro = false,
}: {
  href: string;
  children: ReactNode;
  escuro?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-1 text-sm font-medium tracking-wide transition-colors ${
        escuro
          ? "border-limao/50 text-white hover:border-limao"
          : "border-petroleo/25 text-petroleo hover:border-petroleo"
      }`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
