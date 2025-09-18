import type { SwotData, TowsStrategy, PresentationSlide } from './types';

export const SWOT_DATA: SwotData = {
  strengths: {
    title: "Forças",
    items: [
      "Crescimento de receita de 25% ano a ano (YoY).",
      "Marca líder no Nordeste (35% de market share).",
      "Aumento de 40% na capacidade produtiva após investimento em nova linha."
    ],
  },
  weaknesses: {
    title: "Fraquezas",
    items: [
      "Queda da margem operacional de 15% para 11% em 12 meses.",
      "80% dos insumos-chave são importados, expostos à volatilidade cambial.",
      "ERP legado sem integração, causando 20% de ineficiência em logística.",
      "Alto turnover na fábrica (24% a.a.), gerando custos elevados de treinamento."
    ],
  },
  opportunities: {
    title: "Oportunidades",
    items: [
      "Mercado flexitariano crescendo 15% ao ano no Sudeste.",
      "Potencial de redução de 30% no custo de TI com ERPs em nuvem.",
      "Acesso a linhas de crédito com juros de CDI + 2% para expansão.",
      "Capacidade ociosa de 25% disponível para novas linhas de produtos."
    ],
  },
  threats: {
    title: "Ameaças",
    items: [
      "Variação cambial de 10% impacta 5% na margem bruta.",
      "Risco regulatório sobre o uso do termo “leite”, podendo exigir rebranding.",
      "Quebra de 40% na safra de aveia nacional, elevando custos.",
      "Aumento de 5% no preço resulta em queda de 10% na demanda (alta elasticidade)."
    ],
  },
};

export const STRATEGIC_PRIORITIES: string[] = [
  "Ampliar a rede de fornecedores de insumos (KPI: Reduzir dependência de um fornecedor para <50% por insumo).",
  "Aumentar a margem operacional (KPI: Aumentar margem de 11% para 14%).",
  "Internalizar parte da produção (KPI: Internalizar 30% do volume de co-packing).",
  "Expandir a penetração de mercado no Sudeste (KPI: Atingir 5% de market share na região)."
];


export const TOWS_STRATEGIES: TowsStrategy[] = [
    {
        type: 'SO',
        title: 'SO: Expansão Agressiva no Sudeste',
        strategy: 'Alavancar a liderança da marca no Nordeste para penetrar no mercado do Sudeste, que está em forte crescimento, visando atingir nosso KPI de market share na região.',
        rationale: 'Acelerar a entrada via canais estratégicos (food service, cafeterias) para capturar valor no mercado de maior poder aquisitivo do país.'
    },
    {
        type: 'ST',
        title: 'ST: Defesa de Margem e Competitividade',
        strategy: 'Utilizar a capacidade produtiva ociosa para otimizar custos e oferecer preços competitivos, protegendo a margem contra a volatilidade do câmbio e a concorrência.',
        rationale: 'A escala de produção reduzirá o custo unitário, fornecendo uma barreira de proteção para a margem operacional, com meta de recuperação da margem.'
    },
    {
        type: 'WO',
        title: 'WO: Modernização e Eficiência Operacional',
        strategy: 'Migrar para um ERP em nuvem para otimizar a gestão de estoques de insumos importados e reduzir ineficiências logísticas, visando a meta de aumento da margem operacional.',
        rationale: 'Uma gestão de dados centralizada e eficiente é crucial para mitigar a dependência de insumos importados e suportar a expansão de forma lucrativa.'
    },
    {
        type: 'WT',
        title: 'WT: Mitigação de Riscos na Cadeia de Suprimentos',
        strategy: 'Desenvolver um programa de qualificação e diversificação de fornecedores nacionais de aveia e embalagens, e buscar um segundo co-packer para reduzir a dependência.',
        rationale: 'Aumentar a resiliência da cadeia de suprimentos contra quebras de safra e volatilidade cambial, garantindo a continuidade da produção.'
    },
    {
        type: 'SO',
        title: 'SO: Lançamento de Linha "Zero Açúcar"',
        strategy: 'Usar a capacidade ociosa para desenvolver e lançar uma linha de produtos “zero açúcar”, mirando o mercado de compras públicas e consumidores health-conscious.',
        rationale: 'Aproveitar a tendência de saudabilidade e a oportunidade de contratos governamentais para diversificar o portfólio com produtos de maior valor agregado.'
    },
    {
        type: 'WO',
        title: 'WO: Programa de Retenção de Talentos',
        strategy: 'Implementar um programa estruturado de retenção de talentos (treinamento, plano de carreira, benefícios) para reduzir o alto turnover na fábrica.',
        rationale: 'Reduzir custos de recrutamento e treinamento e aumentar a produtividade e a qualidade, que são impactadas pela alta rotatividade de pessoal.'
    }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  { type: 'intro', title: 'Apresentação de Análise Estratégica' },
  { type: 'swot-matrix', title: 'Análise SWOT' },
  { type: 'priorities', title: 'Questões Estratégicas Prioritárias' },
  ...TOWS_STRATEGIES.map((strategy, index): PresentationSlide => ({
    type: 'tows',
    index: index,
    title: 'Estratégias TOWS',
  })),
  { type: 'conclusion', title: 'Conclusão' },
];