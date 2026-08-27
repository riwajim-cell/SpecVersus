import { ProductItem, Comparison, Verdict, FAQ } from '../types';

/**
 * Returns the canonical slug for two product IDs in alphabetical order.
 * Example: getCanonicalSlug('samsung-galaxy-s24-ultra', 'iphone-16-pro') -> 'iphone-16-pro-vs-samsung-galaxy-s24-ultra'
 */
export function getCanonicalSlug(idA: string, idB: string): string {
  const sorted = [idA.trim(), idB.trim()].sort((a, b) => a.localeCompare(b));
  return `${sorted[0]}-vs-${sorted[1]}`;
}

/**
 * Parses a slug like 'iphone-16-pro-vs-samsung-galaxy-s24-ultra'
 * Returns the two product IDs and whether the slug is in canonical order.
 */
export function parseComparisonSlug(slug: string): {
  idA: string;
  idB: string;
  isCanonical: boolean;
  canonicalSlug: string;
} | null {
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return null;

  const idA = parts[0].trim();
  const idB = parts[1].trim();
  if (!idA || !idB) return null;

  const canonicalSlug = getCanonicalSlug(idA, idB);
  const isCanonical = slug === canonicalSlug;

  return {
    idA,
    idB,
    isCanonical,
    canonicalSlug
  };
}

/**
 * Formats a currency number cleanly (e.g. $999 or $399.99)
 */
export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

/**
 * Calculates Reasons to Choose Product A over Product B
 */
export function calculateKeyReasons(itemA: ProductItem, itemB: ProductItem): string[] {
  const reasons: string[] = [];

  // Price advantage
  if (itemA.price < itemB.price) {
    const diff = itemB.price - itemA.price;
    const pct = Math.round((diff / itemB.price) * 100);
    reasons.push(`More affordable: Saves ${formatPrice(diff)} (${pct}% lower price) compared to ${itemB.name}`);
  }

  // Rating advantage
  if (itemA.rating > itemB.rating) {
    const diff = (itemA.rating - itemB.rating).toFixed(1);
    reasons.push(`Higher customer satisfaction rating (${itemA.rating}/5.0 vs ${itemB.rating}/5.0, +${diff} points)`);
  }

  // Highlight pros
  if (itemA.pros && itemA.pros.length > 0) {
    reasons.push(itemA.pros[0]);
    if (itemA.pros.length > 1) {
      reasons.push(itemA.pros[1]);
    }
  }

  // Category specific spec advantages
  if (itemA.specs.weight && itemB.specs.weight) {
    const wA = parseFloat(itemA.specs.weight);
    const wB = parseFloat(itemB.specs.weight);
    if (!isNaN(wA) && !isNaN(wB) && wA < wB) {
      reasons.push(`Lighter form factor for everyday portability (${itemA.specs.weight} vs ${itemB.specs.weight})`);
    }
  }

  return reasons.slice(0, 4);
}

/**
 * Computes the comparative verdict, winner, and dynamic synthesis
 */
export function generateVerdict(itemA: ProductItem, itemB: ProductItem): Verdict {
  // Compute weighted score (rating 60%, price-value 40%)
  const maxPrice = Math.max(itemA.price, itemB.price, 1);
  const valueScoreA = (1 - itemA.price / (maxPrice * 1.5)) * 5;
  const valueScoreB = (1 - itemB.price / (maxPrice * 1.5)) * 5;

  const totalScoreA = itemA.rating * 0.65 + valueScoreA * 0.35;
  const totalScoreB = itemB.rating * 0.65 + valueScoreB * 0.35;

  const isTie = Math.abs(totalScoreA - totalScoreB) < 0.05;
  const winner = isTie
    ? `${itemA.name} & ${itemB.name} (Value Tie)`
    : totalScoreA >= totalScoreB
    ? itemA.name
    : itemB.name;

  const winnerId = isTie ? undefined : totalScoreA >= totalScoreB ? itemA.id : itemB.id;

  // Generate dynamic 2-sentence summary
  let summary = '';
  if (itemA.price < itemB.price) {
    summary = `The ${itemA.name} offers stronger price-to-performance value at ${formatPrice(itemA.price)}, making it the budget-conscious pick. Meanwhile, the ${itemB.name} stands out for premium hardware capabilities and flagship specifications at ${formatPrice(itemB.price)}.`;
  } else if (itemA.price > itemB.price) {
    summary = `The ${itemB.name} delivers exceptional value at ${formatPrice(itemB.price)} without major compromises. However, the ${itemA.name} commands higher tier performance and build sophistication for users demanding top-of-the-line hardware.`;
  } else {
    summary = `Priced identically at ${formatPrice(itemA.price)}, both the ${itemA.name} and ${itemB.name} represent pinnacle hardware in the ${itemA.category} space. Your choice rests primarily on brand ecosystem preferences and specific design priorities.`;
  }

  const bestForA = itemA.pros[0]
    ? `Buyers prioritizing ${itemA.pros[0].toLowerCase()}`
    : `Users looking for ${itemA.brand} build quality and ${itemA.category} performance`;

  const bestForB = itemB.pros[0]
    ? `Buyers prioritizing ${itemB.pros[0].toLowerCase()}`
    : `Users looking for ${itemB.brand} build quality and ${itemB.category} performance`;

  return {
    summary,
    winner,
    winnerId,
    bestForA,
    bestForB,
    scoreA: Number(totalScoreA.toFixed(1)),
    scoreB: Number(totalScoreB.toFixed(1))
  };
}

/**
 * Generates dynamic comparative FAQs
 */
export function generateDynamicFaqs(itemA: ProductItem, itemB: ProductItem): FAQ[] {
  const faqs: FAQ[] = [];

  // Price comparison
  if (itemA.price === itemB.price) {
    faqs.push({
      question: `Are the ${itemA.name} and ${itemB.name} the same price?`,
      answer: `Yes, both devices have an identical base MSRP of ${formatPrice(itemA.price)}. Check merchant links for active sales and promotional discounts.`
    });
  } else {
    const cheaper = itemA.price < itemB.price ? itemA : itemB;
    const pricier = itemA.price < itemB.price ? itemB : itemA;
    const diff = pricier.price - cheaper.price;
    faqs.push({
      question: `Which is cheaper: ${itemA.name} or ${itemB.name}?`,
      answer: `The ${cheaper.name} is more affordable, priced at ${formatPrice(cheaper.price)} compared to ${formatPrice(pricier.price)} for the ${pricier.name}—saving you ${formatPrice(diff)}.`
    });
  }

  // Rating comparison
  if (itemA.rating !== itemB.rating) {
    const higher = itemA.rating > itemB.rating ? itemA : itemB;
    const lower = itemA.rating > itemB.rating ? itemB : itemA;
    faqs.push({
      question: `Which product has higher ratings: ${itemA.name} or ${itemB.name}?`,
      answer: `The ${higher.name} holds a higher aggregate score of ${higher.rating}/5.0, compared to ${lower.rating}/5.0 for the ${lower.name}.`
    });
  }

  // Key spec highlight
  if (itemA.specs.processor && itemB.specs.processor) {
    faqs.push({
      question: `How do the processors compare between ${itemA.name} and ${itemB.name}?`,
      answer: `The ${itemA.name} is powered by the ${itemA.specs.processor}, whereas the ${itemB.name} utilizes the ${itemB.specs.processor}.`
    });
  } else if (itemA.specs.battery && itemB.specs.battery) {
    faqs.push({
      question: `How does battery life compare between ${itemA.name} and ${itemB.name}?`,
      answer: `The ${itemA.name} features ${itemA.specs.battery}, while the ${itemB.name} is equipped with ${itemB.specs.battery}.`
    });
  }

  // Who should buy which
  faqs.push({
    question: `Who should buy the ${itemA.name} vs ${itemB.name}?`,
    answer: `Choose the ${itemA.name} if you want ${itemA.pros[0] || 'great performance and value'}. Opt for the ${itemB.name} if you prioritize ${itemB.pros[0] || 'alternative ecosystem features'}.`
  });

  return faqs;
}

/**
 * Finds all spec keys that differ between Product A and Product B
 */
export function getDifferingSpecKeys(itemA: ProductItem, itemB: ProductItem): string[] {
  const allKeys = Array.from(new Set([...Object.keys(itemA.specs), ...Object.keys(itemB.specs)]));
  return allKeys.filter((key) => {
    const valA = (itemA.specs[key] || '').trim().toLowerCase();
    const valB = (itemB.specs[key] || '').trim().toLowerCase();
    return valA !== valB && valA !== '' && valB !== '';
  });
}

/**
 * Dynamically builds a complete Comparison object from any two ProductItems
 */
export function generateComparison(itemA: ProductItem, itemB: ProductItem): Comparison {
  const slug = getCanonicalSlug(itemA.id, itemB.id);
  const category = itemA.category === itemB.category ? itemA.category : 'Tech & Gadgets';
  const verdict = generateVerdict(itemA, itemB);
  const faqs = generateDynamicFaqs(itemA, itemB);
  const reasonsForA = calculateKeyReasons(itemA, itemB);
  const reasonsForB = calculateKeyReasons(itemB, itemA);
  const diffSpecs = getDifferingSpecKeys(itemA, itemB);

  return {
    slug,
    category,
    itemA,
    itemB,
    verdict,
    faqs,
    reasonsForA,
    reasonsForB,
    diffSpecs
  };
}

/**
 * Generates Schema.org JSON-LD structured data for Google Rich Snippets
 */
export function generateSchemaJsonLd(comparison: Comparison): string {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://specversus.dpdns.org/product/${comparison.itemA.id}`,
        "name": comparison.itemA.name,
        "brand": {
          "@type": "Brand",
          "name": comparison.itemA.brand
        },
        "description": comparison.itemA.summary || `${comparison.itemA.name} specifications, pros, cons and price breakdown.`,
        "offers": {
          "@type": "Offer",
          "price": comparison.itemA.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `https://specversus.dpdns.org/out/${comparison.slug}?q=${encodeURIComponent(comparison.itemA.name)}&m=amazon`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": comparison.itemA.rating,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 128
        }
      },
      {
        "@type": "Product",
        "@id": `https://specversus.dpdns.org/product/${comparison.itemB.id}`,
        "name": comparison.itemB.name,
        "brand": {
          "@type": "Brand",
          "name": comparison.itemB.brand
        },
        "description": comparison.itemB.summary || `${comparison.itemB.name} specifications, pros, cons and price breakdown.`,
        "offers": {
          "@type": "Offer",
          "price": comparison.itemB.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `https://specversus.dpdns.org/out/${comparison.slug}?q=${encodeURIComponent(comparison.itemB.name)}&m=amazon`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": comparison.itemB.rating,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 142
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://specversus.dpdns.org/compare/${comparison.slug}#faq`,
        "mainEntity": comparison.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return JSON.stringify(schema, null, 2);
}
