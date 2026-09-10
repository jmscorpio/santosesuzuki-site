import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { Cabecalho } from "@/components/cabecalho";
import { Rodape } from "@/components/rodape";
import { escritorio } from "@/config/escritorio";
import { jsonLdEscritorio } from "@/lib/json-ld";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--fonte-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--fonte-sans",
  display: "swap",
});

const DESCRICAO =
  "Advocacia empresarial estratégica para reestruturações, negociações e conflitos de alta complexidade. Curitiba/PR.";

export const metadata: Metadata = {
  metadataBase: new URL(escritorio.url),
  title: {
    default: `${escritorio.nomeCompleto} — Advocacia empresarial estratégica`,
    template: `%s — ${escritorio.nome}`,
  },
  description: DESCRICAO,
  applicationName: escritorio.nomeCompleto,
  authors: [{ name: escritorio.nomeCompleto }],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: escritorio.url,
    siteName: escritorio.nomeCompleto,
    title: `${escritorio.nomeCompleto} — Advocacia empresarial estratégica`,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: `${escritorio.nomeCompleto} — Advocacia empresarial estratégica`,
    description: DESCRICAO,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEscritorio()) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-sm focus:bg-petroleo focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
      </body>
    </html>
  );
}
