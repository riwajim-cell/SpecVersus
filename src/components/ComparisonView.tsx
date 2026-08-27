import React, { useState, useEffect } from 'react';
import {
  Share2,
  Check,
  Printer,
  Code,
  Sparkles,
  Clock,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ArrowRight
} from 'lucide-react';
import { Comparison } from '../types';
import { getRelatedComparisons, generateSchemaJsonLd } from '../data/comparisons';
import { Breadcrumb } from './Breadcrumb';
import { QuickVerdict } from './QuickVerdict';
import { SpecComparisonTable } from './SpecComparisonTable';
import { ProsConsSection } from './ProsConsSection';
import { FAQAccordion } from './FAQAccordion';
import { RelatedComparisons } from './RelatedComparisons';
import { AdBanner } from './AdBanner';
import { MobileStickyCta } from './MobileStickyCta';

interface ComparisonViewProps {
  comparison: Comparison | null;
  onNavigateHome: () => void;
  onSelectCategory: (category: string) => void;
  onSelectComparison: (slug: string) => void;
  onOpenSchema: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  comparison,
  onNavigateHome,
  onSelectCategory,
  onSelectComparison,
  onOpenSchema,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic SEO Meta updates
  useEffect(() => {
    if (comparison) {
      document.title = `${comparison.itemA.name} vs ${comparison.itemB.name} Comparison & Specs (2026) | SpecVersus`;
    } else {
      document.title = `Comparison Not Found | SpecVersus`;
    }
  }, [comparison]);

  if (!comparison) {
    return (
      <div className="my-16 max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Comparison Matchup Not Found</h1>
          <p className="text-sm text-slate-500">
            We couldn't locate one or both products in our active database for this comparison slug.
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Product Showdowns</span>
          </button>
        </div>
      </div>
    );
  }

  const { slug, category, itemA, itemB, verdict, faqs, reasonsForA, reasonsForB } = comparison;
  const relatedComparisons = getRelatedComparisons(slug, category);
  const jsonLdString = generateSchemaJsonLd(comparison);

  // Dynamically inject/update JSON-LD script tag in document.head
  useEffect(() => {
    const scriptId = 'structured-data-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = jsonLdString;

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [jsonLdString]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="comparison-view-container" className="space-y-6 pb-28 md:pb-12">
      {/* Dynamic JSON-LD Structured Data for Search Engine Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
        <Breadcrumb
          category={category}
          itemAName={itemA.name}
          itemBName={itemB.name}
          onNavigateHome={onNavigateHome}
          onSelectCategory={onSelectCategory}
        />

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            id="back-home-btn"
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Showdowns</span>
          </button>

          <button
            id="share-comparison-btn"
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            id="print-btn"
            type="button"
            onClick={handlePrint}
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            id="view-schema-trigger-btn"
            type="button"
            onClick={onOpenSchema}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg transition-colors cursor-pointer"
            title="Inspect Schema.org JSON-LD"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Schema.org</span>
          </button>
        </div>
      </div>

      {/* Top Google AdSense Leaderboard Placeholder */}
      <AdBanner type="leaderboard" />

      {/* Article H1 & Meta Header */}
      <header className="space-y-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
            {category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Full Technical Teardown
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {itemA.name} vs {itemB.name}: Full Specs, Differences & Verdict
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            By <span className="font-semibold text-slate-900">SpecVersus Editorial Lab</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Updated August 2026
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            4 min read
          </span>
        </div>
      </header>

      {/* 1. Quick Verdict Section */}
      <QuickVerdict itemA={itemA} itemB={itemB} verdict={verdict} slug={slug} />

      {/* 2. Key Reasons to Choose A vs B Cards */}
      {(reasonsForA && reasonsForA.length > 0) || (reasonsForB && reasonsForB.length > 0) ? (
        <section id="key-reasons-section" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasonsForA && reasonsForA.length > 0 && (
            <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Reasons to Choose {itemA.name}</span>
              </h3>
              <ul className="space-y-2">
                {reasonsForA.map((reason, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reasonsForB && reasonsForB.length > 0 && (
            <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Reasons to Choose {itemB.name}</span>
              </h3>
              <ul className="space-y-2">
                {reasonsForB.map((reason, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ) : null}

      {/* 3. Side-by-Side Spec Comparison Table */}
      <SpecComparisonTable itemA={itemA} itemB={itemB} slug={slug} />

      {/* 4. Side-by-Side Pros & Cons Section */}
      <ProsConsSection itemA={itemA} itemB={itemB} />

      {/* 5. Google AdSense In-Article Mid Placeholder */}
      <AdBanner type="in-article" />

      {/* 6. Accordion FAQ Component */}
      <FAQAccordion faqs={faqs} itemAName={itemA.name} itemBName={itemB.name} />

      {/* 7. Related Comparisons Section */}
      <RelatedComparisons
        relatedComparisons={relatedComparisons}
        currentCategory={category}
        onSelect={onSelectComparison}
      />

      {/* 8. Mobile Sticky Bottom CTA Bar */}
      <MobileStickyCta itemA={itemA} itemB={itemB} slug={slug} />
    </div>
  );
};
