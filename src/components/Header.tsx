import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Scale, X, ArrowRight, Code, ShieldCheck, Sun, Moon } from 'lucide-react';
import { Comparison, ProductItem } from '../types';

interface HeaderProps {
  onNavigateHome: () => void;
  onSelectComparison: (slug: string) => void;
  onSelectProduct?: (id: string) => void;
  onOpenAdmin: () => void;
  onOpenSchema?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentSlug?: string | null;
  comparisons: Comparison[];
  products: ProductItem[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onSelectComparison,
  onSelectProduct,
  onOpenAdmin,
  onOpenSchema,
  searchTerm,
  onSearchChange,
  currentSlug,
  comparisons,
  products,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter comparisons & products for live search dropdown
  const filteredMatches = React.useMemo(() => {
    if (!searchTerm.trim()) return { comparisons: [], products: [] };
    const query = searchTerm.toLowerCase();

    const matchedComps = comparisons.filter((c) => {
      return (
        c.itemA.name.toLowerCase().includes(query) ||
        c.itemB.name.toLowerCase().includes(query) ||
        c.itemA.brand.toLowerCase().includes(query) ||
        c.itemB.brand.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    }).slice(0, 5);

    const matchedProds = products.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }).slice(0, 3);

    return { comparisons: matchedComps, products: matchedProds };
  }, [searchTerm, comparisons, products]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Logo & Brand */}
          <div
            id="brand-logo"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer select-none flex-shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Spec<span className="text-indigo-600 dark:text-indigo-400">Versus</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                  Compare
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block -mt-0.5">
                Objective Tech Head-to-Head
              </span>
            </div>
          </div>

          {/* Search Bar with live dropdown */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-lg">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="global-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search phones, laptops, audio, consoles (e.g. iPhone 16, M3 Mac)..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  id="clear-search-btn"
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Quick Results Dropdown */}
            {isSearchFocused && searchTerm.trim() && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-50 animate-in fade-in-50 duration-100 divide-y divide-slate-100 dark:divide-slate-700">
                <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
                  <span>Search Matches</span>
                  <span>{filteredMatches.comparisons.length + filteredMatches.products.length} found</span>
                </div>

                {/* Showdown matches */}
                {filteredMatches.comparisons.length > 0 && (
                  <div>
                    <div className="px-3 py-1 bg-slate-50/50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                      Comparisons
                    </div>
                    {filteredMatches.comparisons.map((item) => (
                      <div
                        key={item.slug}
                        onClick={() => {
                          onSelectComparison(item.slug);
                          setIsSearchFocused(false);
                        }}
                        className="p-3 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 cursor-pointer flex items-center justify-between gap-2 transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.itemA.name} <span className="text-indigo-600 dark:text-indigo-400 font-normal">vs</span> {item.itemB.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {item.category} • Winner: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.verdict.winner}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Single Product Hub matches */}
                {filteredMatches.products.length > 0 && onSelectProduct && (
                  <div>
                    <div className="px-3 py-1 bg-slate-50/50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                      Single Product Specs
                    </div>
                    {filteredMatches.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p.id);
                          setIsSearchFocused(false);
                        }}
                        className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center justify-between gap-2 transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {p.brand} • {p.category} • ${p.price}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">View Specs →</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredMatches.comparisons.length === 0 && filteredMatches.products.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No exact matches found for "{searchTerm}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {currentSlug && onOpenSchema && (
              <button
                id="view-schema-btn"
                type="button"
                onClick={onOpenSchema}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="View JSON-LD SEO Schema"
              >
                <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>JSON-LD</span>
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Admin Dashboard */}
            <button
              id="admin-nav-btn"
              type="button"
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Open Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin</span>
            </button>

            {/* Browse all button */}
            <button
              id="all-comparisons-nav-btn"
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
