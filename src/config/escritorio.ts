/**
 * Fonte única de verdade dos dados do escritório.
 *
 * Os valores marcados com PENDENTE são placeholders: precisam ser substituídos por
 * dados reais antes de publicar. Ver SUBSTITUIR.md na raiz do projeto.
 */

export const PENDENTE = (campo: string) => `{{${campo}}}` as const;

export const escritorio = {
  nome: "Santos & Suzuki",
  nomeCompleto: "Santos & Suzuki Advocacia",
  dominio: "santosesuzuki.com",
  url: "https://santosesuzuki.com",

  // --- Confirmados (extraídos do timbrado oficial) ---
  endereco: {
    logradouro: "Rua Simão Bolivar, 897",
    cidade: "Curitiba",
    uf: "PR",
    cep: "80.040-140",
    pais: "BR",
  },
  telefone: "(41) 3073-1834",
  telefoneE164: "+554130731834",
  email: "contato@santosesuzuki.com",

  // --- Pendentes de preenchimento ---
  cnpj: "27.518.502/0001-65",
  registroOAB: "6.074",
  encarregadoLGPD: {
    nome: "João Maria dos Santos",
    email: PENDENTE("ENCARREGADO_LGPD_EMAIL"),
  },
  horarioAtendimento: PENDENTE("HORARIO_ATENDIMENTO"),
} as const;

export type Profissional = {
  slug: string;
  nome: string;
  cargo: string;
  oab: string;
  bio: string;
  formacao: string[];
  email?: string;
};

export const profissionais: Profissional[] = [
  {
    slug: "socio-1",
    nome: "João Maria dos Santos",
    cargo: "Sócio",
    oab: "OAB/PR 84.141",
    bio: PENDENTE("SOCIO_1_BIO"),
    formacao: [PENDENTE("SOCIO_1_FORMACAO")],
  },
  {
    slug: "socio-2",
    nome: "Elaine Yumi Suzuki",
    cargo: "Sócia",
    oab: "OAB/PR 48.362",
    bio: PENDENTE("SOCIO_2_BIO"),
    formacao: [PENDENTE("SOCIO_2_FORMACAO")],
  },
];

/** true quando o valor ainda é um placeholder `{{...}}`. */
export function pendente(valor: string): boolean {
  return /^\{\{.+\}\}$/.test(valor);
}
