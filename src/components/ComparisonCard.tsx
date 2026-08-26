import React from 'react';
import { ArrowRight, Trophy, Sparkles, Star } from 'lucide-react';
import { Comparison } from '../types';

interface ComparisonCardProps {
  comparison: Comparison;
  onSelect: (slug: string) => void;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ comparison, onSelect }) => {
  const { slug, category, itemA, itemB, verdict } = comparison;

  return (
    <div
      id={`card-${slug}`}
      onClick={() => onSelect(slug)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-400/80 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Card Header: Category & Winner */}
      <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
          <Sparkles className="w-3 h-3" />
          {category}
        </span>

        <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span className="truncate max-w-[130px]">{verdict.winner}</span>
        </div>
      </div>

      {/* VS Showcase */}
      <div className="p-5 space-y-4">
        {/* Item A row */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 group-hover:bg-slate-50 transition-colors">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{itemA.brand}</span>
            <h4 className="text-sm font-bold text-slate-900 truncate">{itemA.name}</h4>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-bold text-slate-900 block">${itemA.price}</span>
            <span className="text-[11px] text-amber-600 font-medium flex items-center justify-end gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {itemA.rating}
            </span>
          </div>
        </div>

        {/* VS Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="absolute px-3 bg-white text-[11px] font-black text-slate-400 uppercase tracking-wider">
            VS
          </span>
        </div>

        {/* Item B row */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 group-hover:bg-slate-50 transition-colors">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{itemB.brand}</span>
            <h4 className="text-sm font-bold text-slate-900 truncate">{itemB.name}</h4>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-bold text-slate-900 block">${itemB.price}</span>
            <span className="text-[11px] text-amber-600 font-medium flex items-center justify-end gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {itemB.rating}
            </span>
          </div>
        </div>

        {/* One-sentence snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
          {verdict.summary}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 px-5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
        <span>Detailed Specs & Analysis</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
          Compare Now <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
