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
    cep: PENDENTE("CEP"),
    pais: "BR",
  },
  telefone: "(41) 3073-1834",
  telefoneE164: "+554130731834",
  email: "contato@santosesuzuki.com",

  // --- Pendentes de preenchimento ---
  cnpj: PENDENTE("CNPJ"),
  registroOAB: PENDENTE("REGISTRO_SOCIEDADE_OAB_PR"),
  encarregadoLGPD: {
    nome: PENDENTE("ENCARREGADO_LGPD_NOME"),
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
    nome: PENDENTE("SOCIO_1_NOME"),
    cargo: "Sócio",
    oab: PENDENTE("SOCIO_1_OAB"),
    bio: PENDENTE("SOCIO_1_BIO"),
    formacao: [PENDENTE("SOCIO_1_FORMACAO")],
  },
  {
    slug: "socio-2",
    nome: PENDENTE("SOCIO_2_NOME"),
    cargo: "Sócio",
    oab: PENDENTE("SOCIO_2_OAB"),
    bio: PENDENTE("SOCIO_2_BIO"),
    formacao: [PENDENTE("SOCIO_2_FORMACAO")],
  },
];

/** true quando o valor ainda é um placeholder `{{...}}`. */
export function pendente(valor: string): boolean {
  return /^\{\{.+\}\}$/.test(valor);
}
