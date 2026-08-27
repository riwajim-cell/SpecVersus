export interface ProductSpecs {
  battery?: string;
  display?: string;
  processor?: string;
  storage?: string;
  camera?: string;
  weight?: string;
  os?: string;
  connectivity?: string;
  dimensions?: string;
  [key: string]: string | undefined;
}

export interface ProductItem {
  id: string; // slug ID e.g. "iphone-16-pro"
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  image?: string;
  summary?: string;
  specs: ProductSpecs;
  pros: string[];
  cons: string[];
}

export interface Verdict {
  summary: string;
  winner: string;
  winnerId?: string;
  bestForA: string;
  bestForB: string;
  scoreA?: number;
  scoreB?: number;
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
  reasonsForA?: string[];
  reasonsForB?: string[];
  diffSpecs?: string[];
}

export type ModalType = 'privacy' | 'terms' | 'contact' | 'about' | 'schema' | null;

export type ViewRoute =
  | { type: 'home' }
  | { type: 'compare'; slug: string }
  | { type: 'product'; id: string }
  | { type: 'admin' }
  | { type: 'out'; slug: string; query: string; merchant: string };
