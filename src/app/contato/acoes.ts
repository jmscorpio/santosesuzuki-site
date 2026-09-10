"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { escritorio } from "@/config/escritorio";
import {
  ASSUNTOS,
  TEMPO_MINIMO_MS,
  contatoSchema,
  type DadosContato,
} from "@/lib/contato-schema";

export type ResultadoEnvio =
  | { ok: true; simulado: boolean }
  | { ok: false; erro: string };

/**
 * Limite por IP em memória. Suficiente para um site institucional; some a cada
 * reinício da instância e não é compartilhado entre regiões.
 */
const JANELA_MS = 60 * 60 * 1000;
const MAX_POR_JANELA = 5;
const registros = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const anteriores = (registros.get(ip) ?? []).filter(
    (t) => agora - t < JANELA_MS,
  );
  anteriores.push(agora);
  registros.set(ip, anteriores);
  if (registros.size > 5000) registros.clear();
  return anteriores.length > MAX_POR_JANELA;
}

function rotuloAssunto(valor: DadosContato["assunto"]): string {
  return ASSUNTOS.find((a) => a.valor === valor)?.rotulo ?? valor;
}

function corpoEmail(d: DadosContato): string {
  return [
    `Nome: ${d.nome}`,
    `E-mail: ${d.email}`,
    d.organizacao ? `Organização: ${d.organizacao}` : null,
    d.telefone ? `Telefone: ${d.telefone}` : null,
    `Assunto: ${rotuloAssunto(d.assunto)}`,
    "",
    "Mensagem:",
    d.mensagem,
    "",
    "---",
    `Consentimento LGPD registrado em ${new Date().toISOString()}`,
    "Enviado pelo formulário de contato do site.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function enviarContato(
  entrada: unknown,
): Promise<ResultadoEnvio> {
  const analise = contatoSchema.safeParse(entrada);
  if (!analise.success) {
    return { ok: false, erro: "Confira os campos destacados e tente novamente." };
  }
  const dados = analise.data;

  // Honeypot: campo invisível preenchido = robô. Responde como sucesso.
  if (dados.website) return { ok: true, simulado: true };

  // Preenchimento rápido demais para ser humano.
  if (Date.now() - dados.carregadoEm < TEMPO_MINIMO_MS) {
    return { ok: true, simulado: true };
  }

  const cabecalhos = await headers();
  const ip =
    cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    cabecalhos.get("x-real-ip") ??
    "desconhecido";

  if (excedeuLimite(ip)) {
    return {
      ok: false,
      erro: `Muitas mensagens enviadas deste acesso. Escreva diretamente para ${escritorio.email}.`,
    };
  }

  const chave = process.env.RESEND_API_KEY;
  const remetente = process.env.CONTATO_REMETENTE;
  const destinatario = process.env.CONTATO_DESTINATARIO ?? escritorio.email;

  // Sem credencial configurada, o site funciona e a mensagem vai para o log.
  if (!chave || !remetente) {
    console.warn(
      "[contato] RESEND_API_KEY/CONTATO_REMETENTE ausentes — e-mail não enviado.\n" +
        corpoEmail(dados),
    );
    return { ok: true, simulado: true };
  }

  try {
    const resend = new Resend(chave);
    const { error } = await resend.emails.send({
      from: remetente,
      to: destinatario,
      replyTo: dados.email,
      subject: `Contato pelo site — ${rotuloAssunto(dados.assunto)} — ${dados.nome}`,
      text: corpoEmail(dados),
    });
    if (error) throw new Error(error.message);
    return { ok: true, simulado: false };
  } catch (e) {
    console.error("[contato] falha no envio:", e);
    return {
      ok: false,
      erro: `Não foi possível enviar agora. Escreva diretamente para ${escritorio.email}.`,
    };
  }
}
