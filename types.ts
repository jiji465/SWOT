
export interface SwotCategory {
  title: string;
  items: string[];
}

export interface SwotData {
  strengths: SwotCategory;
  weaknesses: SwotCategory;
  opportunities: SwotCategory;
  threats: SwotCategory;
}

export interface TowsStrategy {
  type: 'SO' | 'ST' | 'WO' | 'WT';
  title: string;
  strategy: string;
  rationale: string;
}

export type PresentationSlide =
  | { type: 'intro'; title: string; }
  | { type: 'swot-matrix'; title: string; }
  | { type: 'priorities'; title: string; }
  | { type: 'tows'; index: number; title: string; }
  | { type: 'conclusion'; title: string; };