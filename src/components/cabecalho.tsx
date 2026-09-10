"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navegacaoPrincipal } from "@/config/navegacao";
import { escritorio } from "@/config/escritorio";
import { Container } from "./primitivos";

export function Cabecalho() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borda bg-base/85 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between gap-8">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${escritorio.nomeCompleto} — página inicial`}
          >
            <Image
              src="/logo/logo-petroleo.png"
              alt={escritorio.nomeCompleto}
              width={2010}
              height={515}
              priority
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navegacaoPrincipal.map((item) => {
                const ativo =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={ativo ? "page" : undefined}
                      className={`relative py-2 text-sm tracking-wide transition-colors hover:text-petroleo ${
                        ativo ? "text-petroleo" : "text-tinta-suave"
                      }`}
                    >
                      {item.rotulo}
                      {ativo && (
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full bg-limao"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">
              {aberto ? "Fechar menu" : "Abrir menu"}
            </span>
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-6 bg-petroleo transition-transform duration-200 ${
                  aberto ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-petroleo transition-opacity duration-200 ${
                  aberto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-petroleo transition-transform duration-200 ${
                  aberto ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal"
          className="border-t border-borda bg-base md:hidden"
        >
          <Container>
            <ul className="flex flex-col py-2">
              {navegacaoPrincipal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block border-b border-borda/60 py-4 text-base text-tinta-suave last:border-0"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
