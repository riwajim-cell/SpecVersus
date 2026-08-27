import React, { useState } from 'react';
import { ArrowRight, Shuffle, Sparkles, Scale } from 'lucide-react';
import { ProductItem } from '../types';
import { getCanonicalSlug } from '../utils/comparator';

interface ComparisonBuilderProps {
  products: ProductItem[];
  onSelectComparison: (slug: string) => void;
}

export const ComparisonBuilder: React.FC<ComparisonBuilderProps> = ({
  products,
  onSelectComparison,
}) => {
  const [productAId, setProductAId] = useState<string>(products[0]?.id || 'iphone-16-pro');
  const [productBId, setProductBId] = useState<string>(products[1]?.id || 'samsung-galaxy-s24-ultra');

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productAId || !productBId) return;
    if (productAId === productBId) {
      alert('Please select two distinct products to compare.');
      return;
    }
    const slug = getCanonicalSlug(productAId, productBId);
    onSelectComparison(slug);
  };

  const handleRandomPair = () => {
    if (products.length < 2) return;
    const idxA = Math.floor(Math.random() * products.length);
    let idxB = Math.floor(Math.random() * products.length);
    while (idxB === idxA) {
      idxB = Math.floor(Math.random() * products.length);
    }
    setProductAId(products[idxA].id);
    setProductBId(products[idxB].id);
  };

  return (
    <div id="comparison-builder-card" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Matchup Builder</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Compare Any Two Flagship Devices
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select any two products from our live catalog to generate an instant, deep-dive specification showdown.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRandomPair}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors cursor-pointer border border-white/10"
            title="Pick a random matchup"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-300" />
            <span>Random Matchup</span>
          </button>
        </div>

        <form onSubmit={handleCompare} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Select Product A */}
          <div className="md:col-span-5 space-y-1.5">
            <label htmlFor="product-a-select" className="text-xs font-semibold text-indigo-200 uppercase tracking-wider block">
              Device 1 (Product A)
            </label>
            <select
              id="product-a-select"
              value={productAId}
              onChange={(e) => setProductAId(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white font-medium focus:outline-hidden focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} ({p.brand} • {p.category}) - ${p.price}
                </option>
              ))}
            </select>
          </div>

          {/* VS Divider */}
          <div className="md:col-span-2 flex items-center justify-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-indigo-600/60 border border-indigo-400/40 flex items-center justify-center font-bold text-xs text-white shadow-inner">
              VS
            </div>
          </div>

          {/* Select Product B */}
          <div className="md:col-span-5 space-y-1.5">
            <label htmlFor="product-b-select" className="text-xs font-semibold text-indigo-200 uppercase tracking-wider block">
              Device 2 (Product B)
            </label>
            <select
              id="product-b-select"
              value={productBId}
              onChange={(e) => setProductBId(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white font-medium focus:outline-hidden focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} ({p.brand} • {p.category}) - ${p.price}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-12 pt-2 flex justify-end">
            <button
              id="run-comparison-btn"
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Scale className="w-4 h-4" />
              <span>Launch Head-to-Head Showdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
