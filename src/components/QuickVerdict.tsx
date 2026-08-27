import React from 'react';
import { Trophy, Award, Sparkles, Check } from 'lucide-react';
import { ProductItem, Verdict } from '../types';
import { SplitPriceButton } from './SplitPriceButton';

interface QuickVerdictProps {
  itemA: ProductItem;
  itemB: ProductItem;
  verdict: Verdict;
  slug: string;
}

export const QuickVerdict: React.FC<QuickVerdictProps> = ({ itemA, itemB, verdict, slug }) => {
  const isWinnerA = verdict.winner.toLowerCase().includes(itemA.name.toLowerCase());
  const isWinnerB = verdict.winner.toLowerCase().includes(itemB.name.toLowerCase());

  return (
    <section id="quick-verdict-section" className="mb-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header ribbon */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs text-white">
            <Trophy className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-100">Editor's Overall Recommendation</div>
            <div className="text-base sm:text-lg font-bold flex items-center gap-2">
              <span>Overall Winner:</span>
              <span className="underline decoration-amber-200 underline-offset-4 decoration-2">{verdict.winner}</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Tested & Verified 2026</span>
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* 2-Sentence Summary */}
        <div className="rounded-xl bg-slate-50/80 border border-slate-200/60 p-4 sm:p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Executive Verdict Summary</span>
          </div>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
            {verdict.summary}
          </p>
        </div>

        {/* Best For Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Best for A */}
          <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
            isWinnerA ? 'border-amber-300 bg-amber-50/30 ring-1 ring-amber-300/50' : 'border-slate-200 bg-white'
          }`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Best Match</span>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  {itemA.name}
                  {isWinnerA && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold">
                      <Trophy className="w-3 h-3 text-amber-600" /> Winner
                    </span>
                  )}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 block">Starting at</span>
                <span className="text-base font-bold text-slate-900">${itemA.price.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-normal flex items-start gap-2 pt-1 border-t border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong className="text-slate-800">Ideal for:</strong> {verdict.bestForA}</span>
            </p>

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500 font-medium">Rating: ★ {itemA.rating} / 5.0</span>
              <SplitPriceButton slug={slug} productName={itemA.name} size="sm" />
            </div>
          </div>

          {/* Best for B */}
          <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
            isWinnerB ? 'border-amber-300 bg-amber-50/30 ring-1 ring-amber-300/50' : 'border-slate-200 bg-white'
          }`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Best Match</span>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  {itemB.name}
                  {isWinnerB && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold">
                      <Trophy className="w-3 h-3 text-amber-600" /> Winner
                    </span>
                  )}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 block">Starting at</span>
                <span className="text-base font-bold text-slate-900">${itemB.price.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-normal flex items-start gap-2 pt-1 border-t border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong className="text-slate-800">Ideal for:</strong> {verdict.bestForB}</span>
            </p>

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500 font-medium">Rating: ★ {itemB.rating} / 5.0</span>
              <SplitPriceButton slug={slug} productName={itemB.name} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
