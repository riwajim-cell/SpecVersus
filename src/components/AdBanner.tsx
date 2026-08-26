import React, { useState } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  type: 'leaderboard' | 'in-article' | 'sticky-bottom';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && type === 'sticky-bottom') {
    return null;
  }

  if (type === 'leaderboard') {
    return (
      <div id="ad-leaderboard-top" className={`w-full my-6 ${className}`}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 px-2">
          <span>Advertisement</span>
          <span className="flex items-center gap-1 hover:text-slate-600 cursor-pointer">
            <Info className="w-3 h-3" /> AdChoices
          </span>
        </div>
        <div className="w-full min-h-[90px] bg-slate-50/80 border border-dashed border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between p-4 px-6 relative overflow-hidden group hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              AD
            </div>
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Sponsored Offer</div>
              <div className="text-sm font-medium text-slate-800">Compare Cloud Servers & Tech Hardware Deals</div>
              <div className="text-xs text-slate-500 hidden sm:block">Save up to 40% on verified flagship devices with promo code <span className="font-mono text-slate-700 font-bold">TECH2026</span></div>
            </div>
          </div>
          <div className="mt-3 sm:mt-0 z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-xs hover:bg-slate-50 transition-colors">
              Explore Deals <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </span>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-28 h-28 bg-indigo-50/50 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>
    );
  }

  if (type === 'in-article') {
    return (
      <div id="ad-in-article-mid" className={`my-8 ${className}`}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 px-1">
          <span>Sponsored Content</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Info className="w-3 h-3" /> Google AdSense Placeholder
          </span>
        </div>
        <div className="w-full bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              🏷️
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Special Retailer Promotion</div>
              <div className="text-sm font-semibold text-slate-800">Trade in your old tech for instant cash credit</div>
              <p className="text-xs text-slate-500 mt-0.5">Free insured shipping & instant valuation across top flagship smartphones & laptops.</p>
            </div>
          </div>
          <button
            id="ad-in-article-cta-btn"
            type="button"
            className="w-full sm:w-auto text-nowrap px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            Check Trade-In Value
          </button>
        </div>
      </div>
    );
  }

  if (type === 'sticky-bottom') {
    return (
      <div id="ad-sticky-mobile-bottom" className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:hidden shadow-lg transition-transform ${className}`}>
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              Ad
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-800 truncate">Best Price Guarantee 2026</div>
              <div className="text-[11px] text-slate-500 truncate">Unlock lowest verified prices on tech</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              id="sticky-ad-view-btn"
              type="button"
              className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md shadow-xs hover:bg-indigo-700"
            >
              View
            </button>
            <button
              id="sticky-ad-close-btn"
              type="button"
              onClick={() => setDismissed(true)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Close advertisement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
