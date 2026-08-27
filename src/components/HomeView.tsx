import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Flame, CheckCircle2, Zap, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Comparison, ProductItem } from '../types';
import { ComparisonCard } from './ComparisonCard';
import { ComparisonBuilder } from './ComparisonBuilder';
import { AdBanner } from './AdBanner';

interface HomeViewProps {
  comparisons: Comparison[];
  products: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectComparison: (slug: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

const ITEMS_PER_PAGE = 9;

export const HomeView: React.FC<HomeViewProps> = ({
  comparisons,
  products,
  selectedCategory,
  onSelectCategory,
  onSelectComparison,
  searchTerm,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  // Extract all categories dynamically from catalog
  const dynamicCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...cats];
  }, [products]);

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

  // Pagination calculation
  const totalPages = Math.ceil(filteredComparisons.length / ITEMS_PER_PAGE) || 1;
  const paginatedComparisons = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredComparisons.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredComparisons, currentPage]);

  return (
    <div id="home-view-container" className="space-y-8 pb-12">
      {/* Top Banner Advertisement */}
      <AdBanner type="leaderboard" />

      {/* Hero & Category Navigation Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Programmatic SEO Spec Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            High-Performance Tech & Gadget <span className="text-indigo-600 dark:text-indigo-400">Head-to-Head</span> Showdowns
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Instant, data-backed comparisons across flagship smartphones, ultrabooks, audio, smartwatches, and gaming consoles. Complete with full spec sheets, verified pros & cons, and editor verdicts.
          </p>
        </div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
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

      {/* Interactive Custom Comparison Builder */}
      <ComparisonBuilder products={products} onSelectComparison={onSelectComparison} />

      {/* Category Pills & Filters Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dynamicCategories.map((category) => {
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
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-1.5 py-0.2 text-[11px] rounded-md font-bold ${
                    isSelected
                      ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
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
          <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
            Showing <span className="text-slate-900 dark:text-white font-bold">{filteredComparisons.length}</span> comparison{filteredComparisons.length === 1 ? '' : 's'}
            {selectedCategory !== 'All' && <span> in <span className="text-indigo-600 dark:text-indigo-400">{selectedCategory}</span></span>}
            {searchTerm && <span> matching "<span className="text-slate-900 dark:text-white">{searchTerm}</span>"</span>}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sort by:</span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
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
      {paginatedComparisons.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedComparisons.map((comparison) => (
              <ComparisonCard
                key={comparison.slug}
                comparison={comparison}
                onSelect={onSelectComparison}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    currentPage === 1
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCurrentPage(num)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        currentPage === num
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No comparisons matched your filter</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try searching for a different product model or select "All" from the category filter tabs above.
          </p>
          <button
            id="reset-filter-btn"
            type="button"
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
