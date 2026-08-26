import comparisonsData from './comparisonsData.json';
import { Comparison } from '../types';

export const comparisons: Comparison[] = comparisonsData as Comparison[];

export const allCategories: string[] = [
  'All',
  ...Array.from(new Set(comparisons.map((c) => c.category)))
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getRelatedComparisons(currentSlug: string, category: string, limit = 3): Comparison[] {
  const sameCategory = comparisons.filter((c) => c.category === category && c.slug !== currentSlug);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = comparisons.filter((c) => c.category !== category && c.slug !== currentSlug);
  return [...sameCategory, ...others].slice(0, limit);
}

export function generateSchemaJsonLd(comparison: Comparison): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "name": `${comparison.itemA.name} vs ${comparison.itemB.name} Comparison`,
    "description": comparison.verdict.summary,
    "hasVariant": [
      {
        "@type": "Product",
        "name": comparison.itemA.name,
        "brand": {
          "@type": "Brand",
          "name": comparison.itemA.brand
        },
        "offers": {
          "@type": "Offer",
          "price": comparison.itemA.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": comparison.itemA.rating,
          "bestRating": 5,
          "ratingCount": 128
        }
      },
      {
        "@type": "Product",
        "name": comparison.itemB.name,
        "brand": {
          "@type": "Brand",
          "name": comparison.itemB.brand
        },
        "offers": {
          "@type": "Offer",
          "price": comparison.itemB.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": comparison.itemB.rating,
          "bestRating": 5,
          "ratingCount": 142
        }
      }
    ],
    "mainEntity": comparison.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return JSON.stringify(schema, null, 2);
}
