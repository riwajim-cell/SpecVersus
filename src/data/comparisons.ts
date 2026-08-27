import { Comparison, ProductItem } from '../types';
import { generateComparison, getCanonicalSlug, parseComparisonSlug, generateSchemaJsonLd } from '../utils/comparator';
import { defaultProducts } from '../lib/supabase';

export { generateSchemaJsonLd };

/**
 * Builds trending comparison pairs from a list of products.
 * Pairs items within the same category first, and ensures alphabetical slug ordering.
 */
export function buildComparisonsFromProducts(products: ProductItem[]): Comparison[] {
  const comparisons: Comparison[] = [];
  const processedSlugs = new Set<string>();

  // Group products by category
  const byCategory: Record<string, ProductItem[]> = {};
  products.forEach((p) => {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  });

  // Create intra-category pairings (e.g. iPhone vs Galaxy, Pixel vs iPhone, etc.)
  Object.values(byCategory).forEach((items) => {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const slug = getCanonicalSlug(items[i].id, items[j].id);
        if (!processedSlugs.has(slug)) {
          processedSlugs.add(slug);
          // Maintain sorted itemA and itemB based on alphabetical ID
          const [first, second] = [items[i], items[j]].sort((a, b) => a.id.localeCompare(b.id));
          comparisons.push(generateComparison(first, second));
        }
      }
    }
  });

  return comparisons;
}

// Pre-computed fallback comparisons from default product list
export const comparisons: Comparison[] = buildComparisonsFromProducts(defaultProducts);

export const allCategories: string[] = [
  'All',
  'Smartphones',
  'Laptops',
  'Audio',
  'Wearables',
  'Tablets',
  'Gaming Consoles'
];

export function getComparisonBySlug(slug: string, products: ProductItem[] = defaultProducts): Comparison | null {
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return null;

  const itemA = products.find((p) => p.id === parsed.idA);
  const itemB = products.find((p) => p.id === parsed.idB);

  if (!itemA || !itemB) return null;

  return generateComparison(itemA, itemB);
}

export function getRelatedComparisons(
  currentSlug: string,
  category: string,
  allComparisons: Comparison[] = comparisons,
  limit = 3
): Comparison[] {
  const sameCategory = allComparisons.filter(
    (c) => c.category === category && c.slug !== currentSlug
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = allComparisons.filter(
    (c) => c.category !== category && c.slug !== currentSlug
  );
  return [...sameCategory, ...others].slice(0, limit);
}
