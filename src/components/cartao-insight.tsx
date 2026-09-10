import Link from "next/link";
import type { Insight } from "@/lib/insights";
import { formatarData } from "@/lib/insights";

export function CartaoInsight({ artigo }: { artigo: Insight }) {
  return (
    <li className="bg-base">
      <Link
        href={`/insights/${artigo.slug}`}
        className="group flex h-full flex-col p-8 transition-colors hover:bg-superficie"
      >
        <p className="text-xs tracking-wide text-tinta-suave">
          <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
          <span aria-hidden> · </span>
          {artigo.minutosLeitura} min de leitura
        </p>
        <h3 className="font-display mt-5 text-lg leading-snug tracking-[-0.01em] text-balance">
          {artigo.titulo}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-tinta-suave">
          {artigo.descricao}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm text-petroleo">
          Ler
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
