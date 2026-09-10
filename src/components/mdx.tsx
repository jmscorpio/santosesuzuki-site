import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

/** Estilo do corpo dos artigos. Sem plugin de tipografia: controle explícito. */
export const componentesMdx: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-display mt-14 mb-5 text-xl tracking-[-0.01em] text-balance md:text-2xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="font-display mt-10 mb-4 text-lg tracking-[-0.01em]"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 leading-[1.75] text-tinta-suave" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 space-y-3 text-tinta-suave" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-3 pl-6 text-tinta-suave marker:text-petroleo/45"
      {...props}
    />
  ),
  li: ({ children, ...props }: { children?: ReactNode }) => (
    <li className="leading-[1.75]" {...props}>
      {children}
    </li>
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-tinta" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="border-b border-petroleo/30 text-petroleo transition-colors hover:border-petroleo"
      {...props}
    />
  ),
  hr: () => <hr className="mt-14 border-borda" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-2 border-limao pl-6 text-tinta-suave italic"
      {...props}
    />
  ),
};
