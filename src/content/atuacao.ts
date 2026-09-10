export type Pilar = {
  slug: string;
  titulo: string;
  tituloCurto: string;
  resumo: string;
  abertura: string;
  situacoes: string[];
  atuacao: string;
};

export const pilares: Pilar[] = [
  {
    slug: "reestruturacao-e-recuperacao-judicial",
    titulo: "Reestruturação Empresarial & Recuperação Judicial",
    tituloCurto: "Reestruturação e Recuperação Judicial",
    resumo:
      "Acompanhamento de empresas e credores em cenários de reestruturação de passivo, dentro e fora do processo judicial.",
    abertura:
      "Reestruturar uma empresa é, antes de tudo, um problema de sequência: o que precisa ser decidido primeiro, o que pode esperar e o que não admite recuo depois de feito. O trabalho começa pela leitura da estrutura do passivo, das garantias existentes e da posição de cada grupo de credores — e só então pela escolha do instrumento, judicial ou negocial.",
    situacoes: [
      "Empresa com passivo concentrado em poucos credores e necessidade de reorganizar prazos e garantias",
      "Avaliação entre recuperação judicial, recuperação extrajudicial e reestruturação puramente contratual",
      "Credor que precisa definir sua posição e sua estratégia de voto em processo já em curso",
      "Discussão sobre classificação de créditos, extensão de garantias e alcance da consolidação",
      "Grupo econômico com sociedades em situações patrimoniais distintas entre si",
      "Cumprimento e revisão de plano já homologado",
    ],
    atuacao:
      "Atuamos tanto pela empresa em reestruturação quanto por credores e investidores, com uma condição: a posição é definida no início e sustentada com clareza ao longo de todo o processo. O trabalho envolve o desenho da estratégia, a preparação e discussão do plano, a atuação em assembleia e o acompanhamento do processo até o cumprimento — sempre em articulação com os assessores financeiros e contábeis do cliente.",
  },
  {
    slug: "contencioso-empresarial-estrategico",
    titulo: "Contencioso Empresarial Estratégico",
    tituloCurto: "Contencioso Empresarial Estratégico",
    resumo:
      "Condução de litígios empresariais relevantes, em que o resultado do processo afeta diretamente a operação ou o patrimônio da empresa.",
    abertura:
      "Nem todo processo merece o mesmo tratamento. Há litígios cujo desfecho altera a estrutura societária, o fluxo de caixa ou a continuidade de um contrato central da operação — e esses exigem definição de tese, de prova e de horizonte recursal desde a primeira peça, não no meio do caminho.",
    situacoes: [
      "Conflito societário entre sócios, com discussão sobre apuração de haveres ou controle",
      "Litígio sobre contrato relevante para a operação, incluindo rescisão e revisão",
      "Discussão sobre responsabilidade de administradores ou desconsideração da personalidade jurídica",
      "Disputa com impacto direto em garantia, fluxo de caixa ou capacidade de contratar",
      "Caso que exige coordenação entre esferas judicial, arbitral e administrativa",
      "Processo em fase recursal, com necessidade de reavaliar tese e estratégia",
    ],
    atuacao:
      "Trabalhamos com um número reduzido de casos por vez, o que permite que a condução seja feita por quem definiu a estratégia. Cada caso relevante recebe uma leitura inicial de cenários — inclusive a hipótese de que litigar não seja o melhor caminho — e um plano de prova construído antes da primeira manifestação.",
  },
  {
    slug: "negociacao-e-situacoes-especiais",
    titulo: "Negociação & Situações Especiais",
    tituloCurto: "Negociação e Situações Especiais",
    resumo:
      "Condução de negociações complexas e de situações que não cabem no fluxo ordinário de contratos ou de litígio.",
    abertura:
      "Algumas situações empresariais não se resolvem nem pelo contrato padrão nem pelo processo: exigem negociação conduzida com método, com leitura precisa da alternativa de cada lado caso o acordo não aconteça. É onde o trabalho jurídico se aproxima do desenho da própria operação.",
    situacoes: [
      "Renegociação de dívida com bancos, fornecedores ou investidores",
      "Saída, entrada ou substituição de sócio em ambiente de divergência",
      "Composição de litígio relevante em fase avançada",
      "Operação envolvendo ativo litigioso ou passivo contingente",
      "Impasse contratual em que a rescisão é economicamente inviável para ambos os lados",
      "Situação que envolve simultaneamente credores, sócios e terceiros interessados",
    ],
    atuacao:
      "A negociação é preparada como um caso: mapeamento das partes, das alternativas reais fora da mesa e dos pontos em que existe margem. O acordo é redigido com a mesma atenção dedicada a uma peça processual, porque é ele que vai ser executado — e, se preciso, cobrado.",
  },
  {
    slug: "gestao-estrategica-de-contencioso",
    titulo: "Gestão Estratégica de Contencioso",
    tituloCurto: "Gestão Estratégica de Contencioso",
    resumo:
      "Organização e direcionamento de carteiras contenciosas relevantes, com critério de risco e rotina de acompanhamento.",
    abertura:
      "Empresas com volume de processos costumam ter menos um problema de defesa e mais um problema de leitura: falta saber quais casos concentram risco real, quais repetem a mesma tese e quais estão sendo conduzidos sem critério comum. Sem esse mapa, a carteira consome recursos sem reduzir exposição.",
    situacoes: [
      "Carteira contenciosa dispersa entre vários escritórios, sem tese uniforme",
      "Necessidade de provisionamento com critério defensável perante auditoria",
      "Volume de demandas repetitivas com causa operacional identificável",
      "Ausência de rotina de prazo, de reporte e de escalonamento de casos críticos",
      "Revisão de carteira após aquisição, cisão ou incorporação",
      "Definição de política de acordo e de alçada de negociação",
    ],
    atuacao:
      "O trabalho começa por um diagnóstico da carteira — classificação por risco, por tese e por origem — e resulta em critérios de condução, rotina de reporte e, quando a causa é operacional, recomendações de ajuste no processo interno que gera a demanda. O objetivo é que a empresa passe a decidir sobre a carteira com informação, não por reação a prazo.",
  },
];

export function pilarPorSlug(slug: string): Pilar | undefined {
  return pilares.find((p) => p.slug === slug);
}
