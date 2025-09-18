
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

// FIX: Define a discriminated union for slide types to enable type narrowing in App.tsx, which resolves errors when accessing 'category' and 'index' properties on slide objects.
export type PresentationSlide =
  | { type: 'intro'; title: string; }
  | { type: 'swot'; category: keyof SwotData; title: string; }
  | { type: 'priorities'; title: string; }
  | { type: 'tows'; index: number; title: string; }
  | { type: 'conclusion'; title: string; };
