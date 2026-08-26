import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Flame, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { Comparison } from '../types';
import { allCategories } from '../data/comparisons';
import { ComparisonCard } from './ComparisonCard';
import { AdBanner } from './AdBanner';

interface HomeViewProps {
  comparisons: Comparison[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectComparison: (slug: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export const HomeView: React.FC<HomeViewProps> = ({
  comparisons,
  selectedCategory,
  onSelectCategory,
  onSelectComparison,
  searchTerm,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Filter comparisons based on search and category
  const filteredComparisons = useMemo(() => {
    let result = comparisons;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Filter by Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.itemA.name.toLowerCase().includes(q) ||
          c.itemB.name.toLowerCase().includes(q) ||
          c.itemA.brand.toLowerCase().includes(q) ||
          c.itemB.brand.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.verdict.summary.toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...result];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.itemA.price + a.itemB.price - (b.itemA.price + b.itemB.price));
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.itemA.price + b.itemB.price - (a.itemA.price + a.itemB.price));
    } else if (sortBy === 'rating-desc') {
      sorted.sort((a, b) => b.itemA.rating + b.itemB.rating - (a.itemA.rating + a.itemB.rating));
    }

    return sorted;
  }, [comparisons, selectedCategory, searchTerm, sortBy]);

  return (
    <div id="home-view-container" className="space-y-8 pb-12">
      {/* Top Banner Advertisement */}
      <AdBanner type="leaderboard" />

      {/* Hero & Category Navigation Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Programmatic SEO Spec Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            High-Performance Tech & Gadget <span className="text-indigo-600">Head-to-Head</span> Showdowns
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Instant, data-backed comparisons across flagship smartphones, ultrabooks, audio, cameras, and gaming consoles. Complete with full spec sheets, verified pros & cons, and editor verdicts.
          </p>
        </div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>100% Unbiased Editorial Verdicts</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>OEM Verified Technical Specs</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Schema.org JSON-LD Structured Data</span>
          </div>
        </div>
      </div>

      {/* Category Pills & Filters Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {allCategories.map((category) => {
            const count =
              category === 'All'
                ? comparisons.length
                : comparisons.filter((c) => c.category === category).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                id={`cat-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-1.5 py-0.2 text-[11px] rounded-md font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort & Count Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs sm:text-sm font-semibold text-slate-600">
            Showing <span className="text-slate-900 font-bold">{filteredComparisons.length}</span> comparison{filteredComparisons.length === 1 ? '' : 's'}
            {selectedCategory !== 'All' && <span> in <span className="text-indigo-600">{selectedCategory}</span></span>}
            {searchTerm && <span> matching "<span className="text-slate-900">{searchTerm}</span>"</span>}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
            >
              <option value="default">Default (Featured)</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparisons Grid */}
      {filteredComparisons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComparisons.map((comparison) => (
            <ComparisonCard
              key={comparison.slug}
              comparison={comparison}
              onSelect={onSelectComparison}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No comparisons matched your filter</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try searching for a different product model or select "All" from the category filter tabs above.
          </p>
          <button
            id="reset-filter-btn"
            type="button"
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
