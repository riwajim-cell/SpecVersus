export interface ProductSpecs {
  battery: string;
  display: string;
  processor: string;
  storage: string;
  camera: string;
  [key: string]: string;
}

export interface ProductItem {
  name: string;
  brand: string;
  price: number;
  rating: number;
  specs: ProductSpecs;
  pros: string[];
  cons: string[];
}

export interface Verdict {
  summary: string;
  winner: string;
  bestForA: string;
  bestForB: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  category: string;
  itemA: ProductItem;
  itemB: ProductItem;
  verdict: Verdict;
  faqs: FAQ[];
}

export type ModalType = 'privacy' | 'terms' | 'contact' | 'about' | 'schema' | null;
