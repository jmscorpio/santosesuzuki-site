"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { enviarContato } from "@/app/contato/acoes";
import {
  ASSUNTOS,
  contatoSchema,
  type DadosContato,
} from "@/lib/contato-schema";

/**
 * Isolada do corpo do componente de propósito: a regra react-hooks/purity acusa
 * `Date.now()` escrito dentro dele, mesmo quando a chamada só acontece dentro de
 * um manipulador de evento — que é o caso aqui.
 */
function marcaDeTempo(): number {
  return Date.now();
}

const campo =
  "w-full border border-borda bg-superficie px-4 py-3 text-base text-tinta transition-colors placeholder:text-tinta-suave/60 focus:border-petroleo";
const rotulo = "mb-2 block text-sm text-tinta-suave";

function Erro({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-[#a13b26]">
      {msg}
    </p>
  );
}

export function FormularioContato() {
  const idBase = useId();
  const [estado, setEstado] = useState<
    { tipo: "ocioso" } | { tipo: "ok" } | { tipo: "erro"; msg: string }
  >({ tipo: "ocioso" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DadosContato>({
    resolver: zodResolver(contatoSchema),
    defaultValues: { carregadoEm: 0, website: "" },
  });

  // Marca o instante em que o formulário ficou disponível ao visitante. Fica no
  // estado do react-hook-form, não em ref lida durante a renderização.
  useEffect(() => {
    setValue("carregadoEm", marcaDeTempo());
  }, [setValue]);

  async function aoEnviar(dados: DadosContato) {
    setEstado({ tipo: "ocioso" });
    const r = await enviarContato(dados);
    if (r.ok) {
      setEstado({ tipo: "ok" });
      reset({ carregadoEm: marcaDeTempo(), website: "" });
    } else {
      setEstado({ tipo: "erro", msg: r.erro });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div
        role="status"
        className="border border-borda bg-superficie p-8 md:p-10"
      >
        <span aria-hidden className="mb-6 block h-px w-8 bg-limao" />
        <h2 className="font-display text-xl tracking-[-0.01em]">
          Mensagem recebida.
        </h2>
        <p className="mt-4 text-tinta-suave">
          Retornaremos pelo e-mail informado. Se o assunto exigir urgência,
          o telefone do escritório está ao lado.
        </p>
        <button
          type="button"
          onClick={() => setEstado({ tipo: "ocioso" })}
          className="mt-8 border-b border-petroleo/25 pb-1 text-sm text-petroleo transition-colors hover:border-petroleo"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(aoEnviar)}
      noValidate
      className="border border-borda bg-superficie p-8 md:p-10"
    >
      {/* Honeypot: fora do fluxo visual e do foco por teclado. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${idBase}-website`}>Não preencha este campo</label>
        <input
          id={`${idBase}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <input type="hidden" {...register("carregadoEm", { valueAsNumber: true })} />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${idBase}-nome`} className={rotulo}>
            Nome <span aria-hidden className="text-petroleo/60">*</span>
            <span className="sr-only">(obrigatório)</span>
          </label>
          <input
            id={`${idBase}-nome`}
            type="text"
            autoComplete="name"
            className={campo}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? `${idBase}-nome-erro` : undefined}
            {...register("nome")}
          />
          <Erro id={`${idBase}-nome-erro`} msg={errors.nome?.message} />
        </div>

        <div>
          <label htmlFor={`${idBase}-email`} className={rotulo}>
            E-mail <span aria-hidden className="text-petroleo/60">*</span>
            <span className="sr-only">(obrigatório)</span>
          </label>
          <input
            id={`${idBase}-email`}
            type="email"
            autoComplete="email"
            className={campo}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${idBase}-email-erro` : undefined}
            {...register("email")}
          />
          <Erro id={`${idBase}-email-erro`} msg={errors.email?.message} />
        </div>

        <div>
          <label htmlFor={`${idBase}-org`} className={rotulo}>
            Empresa ou organização
          </label>
          <input
            id={`${idBase}-org`}
            type="text"
            autoComplete="organization"
            className={campo}
            {...register("organizacao")}
          />
        </div>

        <div>
          <label htmlFor={`${idBase}-tel`} className={rotulo}>
            Telefone
          </label>
          <input
            id={`${idBase}-tel`}
            type="tel"
            autoComplete="tel"
            className={campo}
            {...register("telefone")}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`${idBase}-assunto`} className={rotulo}>
          Assunto <span aria-hidden className="text-petroleo/60">*</span>
          <span className="sr-only">(obrigatório)</span>
        </label>
        <select
          id={`${idBase}-assunto`}
          className={campo}
          defaultValue=""
          aria-invalid={!!errors.assunto}
          aria-describedby={
            errors.assunto ? `${idBase}-assunto-erro` : undefined
          }
          {...register("assunto")}
        >
          <option value="" disabled>
            Selecione
          </option>
          {ASSUNTOS.map((a) => (
            <option key={a.valor} value={a.valor}>
              {a.rotulo}
            </option>
          ))}
        </select>
        <Erro id={`${idBase}-assunto-erro`} msg={errors.assunto?.message} />
      </div>

      <div className="mt-6">
        <label htmlFor={`${idBase}-msg`} className={rotulo}>
          Mensagem <span aria-hidden className="text-petroleo/60">*</span>
          <span className="sr-only">(obrigatório)</span>
        </label>
        <textarea
          id={`${idBase}-msg`}
          rows={7}
          className={`${campo} resize-y`}
          placeholder="Descreva a situação em linhas gerais. Não inclua informações sigilosas neste primeiro contato."
          aria-invalid={!!errors.mensagem}
          aria-describedby={`${idBase}-msg-ajuda${errors.mensagem ? ` ${idBase}-msg-erro` : ""}`}
          {...register("mensagem")}
        />
        <p id={`${idBase}-msg-ajuda`} className="mt-2 text-xs text-tinta-suave">
          Este canal não estabelece relação profissional nem substitui consulta
          sobre caso concreto.
        </p>
        <Erro id={`${idBase}-msg-erro`} msg={errors.mensagem?.message} />
      </div>

      <div className="mt-8 border-t border-borda pt-6">
        <div className="flex gap-3">
          <input
            id={`${idBase}-consent`}
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[#002b33]"
            aria-invalid={!!errors.consentimento}
            aria-describedby={
              errors.consentimento ? `${idBase}-consent-erro` : undefined
            }
            {...register("consentimento")}
          />
          <label
            htmlFor={`${idBase}-consent`}
            className="text-sm leading-relaxed text-tinta-suave"
          >
            Autorizo o tratamento dos meus dados pessoais para que o escritório
            responda a este contato, nos termos da{" "}
            <Link
              href="/politica-de-privacidade"
              className="border-b border-petroleo/30 text-petroleo hover:border-petroleo"
            >
              Política de Privacidade
            </Link>
            . <span aria-hidden className="text-petroleo/60">*</span>
          </label>
        </div>
        <Erro
          id={`${idBase}-consent-erro`}
          msg={errors.consentimento?.message}
        />
      </div>

      {estado.tipo === "erro" && (
        <p role="alert" className="mt-6 border border-[#a13b26]/30 bg-[#a13b26]/5 p-4 text-sm text-[#a13b26]">
          {estado.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="superficie-escura mt-8 w-full bg-petroleo px-8 py-4 text-sm tracking-wide text-white transition-colors hover:bg-petroleo-claro disabled:opacity-60 md:w-auto"
      >
        {isSubmitting ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
