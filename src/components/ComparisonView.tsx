import React, { useState } from 'react';
import { Share2, Check, Printer, Code, Sparkles, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Comparison } from '../types';
import { getRelatedComparisons } from '../data/comparisons';
import { Breadcrumb } from './Breadcrumb';
import { QuickVerdict } from './QuickVerdict';
import { SpecComparisonTable } from './SpecComparisonTable';
import { ProsConsSection } from './ProsConsSection';
import { FAQAccordion } from './FAQAccordion';
import { RelatedComparisons } from './RelatedComparisons';
import { AdBanner } from './AdBanner';

interface ComparisonViewProps {
  comparison: Comparison;
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
  const { slug, category, itemA, itemB, verdict, faqs } = comparison;

  const relatedComparisons = getRelatedComparisons(slug, category);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="comparison-view-container" className="space-y-6 pb-16">
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
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Showdowns</span>
          </button>

          <button
            id="share-comparison-btn"
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
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
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            id="view-schema-trigger-btn"
            type="button"
            onClick={onOpenSchema}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg transition-colors"
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
      <QuickVerdict itemA={itemA} itemB={itemB} verdict={verdict} />

      {/* 2. Side-by-Side Spec Comparison Table */}
      <SpecComparisonTable itemA={itemA} itemB={itemB} />

      {/* 3. Side-by-Side Pros & Cons Section */}
      <ProsConsSection itemA={itemA} itemB={itemB} />

      {/* 4. Google AdSense In-Article Mid Placeholder */}
      <AdBanner type="in-article" />

      {/* 5. Accordion FAQ Component */}
      <FAQAccordion faqs={faqs} itemAName={itemA.name} itemBName={itemB.name} />

      {/* 6. Related Comparisons Section */}
      <RelatedComparisons
        relatedComparisons={relatedComparisons}
        currentCategory={category}
        onSelect={onSelectComparison}
      />

      {/* 7. Google AdSense Sticky Mobile Bottom Placeholder */}
      <AdBanner type="sticky-bottom" />
    </div>
  );
};
