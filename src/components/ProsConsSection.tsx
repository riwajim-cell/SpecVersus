import React from 'react';
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ProductItem } from '../types';

interface ProsConsSectionProps {
  itemA: ProductItem;
  itemB: ProductItem;
}

export const ProsConsSection: React.FC<ProsConsSectionProps> = ({ itemA, itemB }) => {
  return (
    <section id="pros-cons-section" className="mb-10">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-indigo-600" />
          <span>Pros & Cons Comparison</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Real-world strengths and trade-offs identified during hands-on evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item A Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Item A Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{itemA.brand}</span>
              <h3 className="text-base font-bold text-slate-900">{itemA.name}</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
              ${itemA.price}
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6 flex-1 flex flex-col justify-between">
            {/* Pros */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The Advantages (Pros)</span>
              </h4>
              <ul className="space-y-2.5">
                {itemA.pros.map((pro, index) => (
                  <li key={index} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span className="leading-normal">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>The Limitations (Cons)</span>
              </h4>
              <ul className="space-y-2.5">
                {itemA.cons.map((con, index) => (
                  <li key={index} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                    <span className="leading-normal">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Item B Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Item B Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{itemB.brand}</span>
              <h3 className="text-base font-bold text-slate-900">{itemB.name}</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
              ${itemB.price}
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6 flex-1 flex flex-col justify-between">
            {/* Pros */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The Advantages (Pros)</span>
              </h4>
              <ul className="space-y-2.5">
                {itemB.pros.map((pro, index) => (
                  <li key={index} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span className="leading-normal">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>The Limitations (Cons)</span>
              </h4>
              <ul className="space-y-2.5">
                {itemB.cons.map((con, index) => (
                  <li key={index} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                    <span className="leading-normal">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
