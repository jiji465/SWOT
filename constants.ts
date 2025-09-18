
import type { SwotData, TowsStrategy, PresentationSlide } from './types';

export const SWOT_DATA: SwotData = {
  strengths: {
    title: "Forças (Strengths)",
    items: [
      "Crescimento consistente de receita (crescimento de R$12 milhões em 2 anos).",
      "Marca reconhecida no Nordeste e início de presença no Sudeste.",
      "Crescimento constante da capacidade produtiva (7% em 2 anos)."
    ],
  },
  weaknesses: {
    title: "Fraquezas (Weaknesses)",
    items: [
      "Margem operacional em queda (queda de 3% em 2 anos).",
      "Dependência de insumos importados (amêndoa: aproximadamente 70%).",
      "ERP antigo que limita gestão de estoque e planejamento.",
      "Dependência de um único co-packer para iogurtes.",
      "Alto turnover na fábrica (24%)."
    ],
  },
  opportunities: {
    title: "Oportunidades (Opportunities)",
    items: [
      "Expansão do público flexitariano no Brasil.",
      "ERPs em nuvem mais acessíveis; melhorias em fermentação/texturização.",
      "Linhas de crédito acessíveis.",
      "Potencial de aumentar a capacidade produtiva (em crescimento, mas ainda baixa)."
    ],
  },
  threats: {
    title: "Ameaças (Threats)",
    items: [
      "Câmbio volátil (impactando insumos importados).",
      "Discussões regulatórias sobre o uso da palavra “leite” em bebidas vegetais.",
      "Seca que pode afetar a produção de aveia nacional.",
      "Consumidores sensíveis a preço e rótulos."
    ],
  },
};

export const STRATEGIC_PRIORITIES: string[] = [
  "Ampliar sua rede de fornecedores de insumo e embalagem a fim de aumentar sua segurança operacional.",
  "Reduzir custos e aumentar margem operacional (via eficiência logística, renegociação com fornecedores e atualização do ERP).",
  "Diminuir dependência de insumos e parceiros únicos (diversificação de fornecedores e busca de novos co-packers).",
  "Expandir a penetração no Sudeste (fortalecer marketing, degustações e parcerias com cafeterias e hotéis)."
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

// FIX: By explicitly typing PRESENTATION_SLIDES with the PresentationSlide[] discriminated union, we enable TypeScript to correctly narrow the slide type in App.tsx's switch statement, resolving errors when accessing properties like 'category' and 'index'.
export const PRESENTATION_SLIDES: PresentationSlide[] = [
  { type: 'intro', title: 'Apresentação de Análise Estratégica' },
  { type: 'swot', category: 'strengths', title: 'Análise SWOT: Forças' },
  { type: 'swot', category: 'weaknesses', title: 'Análise SWOT: Fraquezas' },
  { type: 'swot', category: 'opportunities', title: 'Análise SWOT: Oportunidades' },
  { type: 'swot', category: 'threats', title: 'Análise SWOT: Ameaças' },
  { type: 'priorities', title: 'Questões Estratégicas Prioritárias' },
  ...TOWS_STRATEGIES.map((strategy, index) => ({
    type: 'tows',
    index: index,
    title: `Estratégia TOWS: ${strategy.title.replace(' (Extra)', '')}`,
  })),
  { type: 'conclusion', title: 'Conclusão' },
];
