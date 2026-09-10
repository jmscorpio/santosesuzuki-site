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
    bio: "Advogado com trajetória iniciada no Poder Judiciário, onde atuou por mais de uma década assessorando Vara Cível e, posteriormente, gabinete de Desembargador do Tribunal de Justiça do Paraná. Desde 2014 atua na advocacia e perante os Tribunais, reunindo estratégia processual, liderança de equipes e organização de operações jurídicas. Dedica-se também ao desenvolvimento de soluções de automação, dados e eficiência operacional aplicadas ao trabalho jurídico. É graduado em Direito pelo Centro Universitário Filadélfia (UniFil) e pós-graduado em Direito Processual Civil pela Escola da Magistratura do Paraná.",
    formacao: [
      "Graduação em Direito — Centro Universitário Filadélfia (UniFil), 2002–2007",
      "Pós-graduação em Direito Processual Civil — Escola da Magistratura do Paraná, 2008",
    ],
  },
  {
    slug: "socio-2",
    nome: "Elaine Yumi Suzuki",
    cargo: "Sócia",
    oab: "OAB/PR 48.362",
    bio: "Advogada com mais de 20 anos de experiência jurídica, com trajetória no Poder Judiciário, no Ministério Público do Estado do Paraná e na advocacia empresarial. Atua em contencioso empresarial estratégico, reestruturação e recuperação judicial, negociação e gestão estratégica de contencioso, com experiência em coordenação de equipes e organização de rotinas jurídicas. É graduada em Direito pela Universidade Norte do Paraná (UNOPAR) e especialista em Direito Empresarial pela Universidade Estadual de Londrina (UEL), com formação complementar pela Escola da Magistratura do Paraná.",
    formacao: [
      "Graduação em Direito — Universidade Norte do Paraná (UNOPAR), 2002–2006",
      "Especialização em Direito Empresarial — Universidade Estadual de Londrina (UEL), 2007–2009",
    ],
  },
];

/** true quando o valor ainda é um placeholder `{{...}}`. */
export function pendente(valor: string): boolean {
  return /^\{\{.+\}\}$/.test(valor);
}
