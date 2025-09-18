
import type { SwotData, TowsStrategy, PresentationSlide } from './types';

export const SWOT_DATA: SwotData = {
  strengths: {
    title: "Forças",
    items: [
      "Crescimento consistente de receita.",
      "Marca reconhecida no Nordeste.",
      "Crescimento da capacidade produtiva."
    ],
  },
  weaknesses: {
    title: "Fraquezas",
    items: [
      "Margem operacional em queda.",
      "Dependência de insumos importados.",
      "ERP antigo e limitador.",
      "Alto turnover na fábrica (24%)."
    ],
  },
  opportunities: {
    title: "Oportunidades",
    items: [
      "Expansão do público flexitariano.",
      "ERPs em nuvem mais acessíveis.",
      "Linhas de crédito acessíveis.",
      "Potencial de aumentar capacidade."
    ],
  },
  threats: {
    title: "Ameaças",
    items: [
      "Câmbio volátil.",
      "Regulamentação da palavra “leite”.",
      "Seca afetando produção de aveia.",
      "Consumidores sensíveis a preço."
    ],
  },
};

export const STRATEGIC_PRIORITIES: string[] = [
  "Ampliar a rede de fornecedores de insumos e embalagens.",
  "Reduzir custos e aumentar a margem operacional.",
  "Diminuir a dependência de parceiros únicos (co-packers).",
  "Expandir a penetração de mercado no Sudeste."
];


export const TOWS_STRATEGIES: TowsStrategy[] = [
    {
        type: 'SO',
        title: 'Força + Oportunidade',
        strategy: 'Utilizar a marca já reconhecida no Nordeste e o portfólio diversificado para acelerar a entrada no Sudeste, aproveitando o crescimento do público flexitariano.',
        rationale: 'Reforçar a presença em cafeterias/hotéis e ampliar degustações, consolidando espaço antes da concorrência.'
    },
    {
        type: 'ST',
        title: 'Força + Ameaça',
        strategy: 'Explorar a capacidade ociosa e eficiência produtiva para oferecer preços mais competitivos diante da entrada de multinacionais.',
        rationale: 'Maior escala reduz custos unitários e melhora a margem mesmo em cenário competitivo.'
    },
    {
        type: 'WO',
        title: 'Fraqueza + Oportunidade',
        strategy: 'Atualizar o ERP para uma solução em nuvem que melhore planejamento de estoque e visibilidade, reduzindo custos logísticos e aproveitando novas tecnologias acessíveis.',
        rationale: 'Melhora eficiência interna e libera margem para investir em expansão.'
    },
    {
        type: 'WT',
        title: 'Fraqueza + Ameaça',
        strategy: 'Diversificar fornecedores de insumos e encontrar mais de um co-packer para reduzir a dependência atual, mitigando riscos de câmbio volátil e gargalos produtivos.',
        rationale: 'Garante resiliência da operação diante de fatores externos e regulações.'
    },
    {
        type: 'SO',
        title: 'SO (Extra)',
        strategy: 'Ampliar a linha “zero açúcar” para captar consumidores de editais de compras públicas que demandam opções saudáveis e sem lactose.',
        rationale: 'Conecta portfólio atual com tendência de políticas públicas e saúde.'
    },
    {
        type: 'WO',
        title: 'WO (Extra)',
        strategy: 'Programa interno de retenção de talentos (treinamento, benefícios, clima organizacional) para reduzir turnover.',
        rationale: 'Mão de obra estável aumenta produtividade e reduz custos de rotatividade.'
    }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  { type: 'intro', title: 'Apresentação de Análise Estratégica' },
  { type: 'swot-matrix', title: 'Análise SWOT' },
  { type: 'priorities', title: 'Questões Estratégicas Prioritárias' },
  // FIX: Added an explicit return type to the map callback to ensure the created object conforms to the PresentationSlide union type.
  ...TOWS_STRATEGIES.map((strategy, index): PresentationSlide => ({
    type: 'tows',
    index: index,
    title: `Estratégia TOWS: ${strategy.title.replace(' (Extra)', '')}`,
  })),
  { type: 'conclusion', title: 'Conclusão' },
];
