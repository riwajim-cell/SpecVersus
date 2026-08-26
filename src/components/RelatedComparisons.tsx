import React from 'react';
import { Layers, ArrowRight, Trophy } from 'lucide-react';
import { Comparison } from '../types';

interface RelatedComparisonsProps {
  relatedComparisons: Comparison[];
  currentCategory: string;
  onSelect: (slug: string) => void;
}

export const RelatedComparisons: React.FC<RelatedComparisonsProps> = ({
  relatedComparisons,
  currentCategory,
  onSelect,
}) => {
  if (!relatedComparisons || relatedComparisons.length === 0) {
    return null;
  }

  return (
    <section id="related-comparisons-section" className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Related Comparisons</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            More in-depth showdowns in {currentCategory} and popular flagships.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedComparisons.map((item) => (
          <div
            key={item.slug}
            id={`related-card-${item.slug}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onSelect(item.slug);
            }}
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-500" />
                  <span className="truncate max-w-[120px]">{item.verdict.winner}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {item.itemA.name} vs {item.itemB.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                {item.verdict.summary}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-indigo-600">
              <span>View Specs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
