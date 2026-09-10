import { z } from "zod";

/** Tempo mínimo de preenchimento. Envio mais rápido que isso é robô. */
export const TEMPO_MINIMO_MS = 3000;

export const contatoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("E-mail inválido."),
  organizacao: z.string().trim().max(160, "Texto muito longo.").optional(),
  telefone: z.string().trim().max(40, "Telefone muito longo.").optional(),
  assunto: z.enum(
    [
      "reestruturacao",
      "contencioso",
      "negociacao",
      "gestao-carteira",
      "outro",
    ],
    "Selecione um assunto.",
  ),
  mensagem: z
    .string()
    .trim()
    .min(30, "Descreva a situação em pelo menos 30 caracteres.")
    .max(4000, "Mensagem muito longa."),
  consentimento: z.literal(true, "É necessário concordar para enviar."),

  // Antispam — nunca preenchidos por pessoa.
  website: z.string().max(0).optional(),
  carregadoEm: z.number(),
});

export type DadosContato = z.infer<typeof contatoSchema>;

export const ASSUNTOS: { valor: DadosContato["assunto"]; rotulo: string }[] = [
  { valor: "reestruturacao", rotulo: "Reestruturação e recuperação judicial" },
  { valor: "contencioso", rotulo: "Contencioso empresarial" },
  { valor: "negociacao", rotulo: "Negociação e situações especiais" },
  { valor: "gestao-carteira", rotulo: "Gestão de carteira contenciosa" },
  { valor: "outro", rotulo: "Outro assunto" },
];
