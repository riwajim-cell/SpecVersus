import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Scale, X, ArrowRight, Code } from 'lucide-react';
import { Comparison } from '../types';
import { comparisons } from '../data/comparisons';

interface HeaderProps {
  onNavigateHome: () => void;
  onSelectComparison: (slug: string) => void;
  onOpenSchema?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentSlug?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onSelectComparison,
  onOpenSchema,
  searchTerm,
  onSearchChange,
  currentSlug,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter comparisons based on search term for the quick dropdown
  const filteredQuickResults = searchTerm.trim()
    ? comparisons.filter((c) => {
        const query = searchTerm.toLowerCase();
        return (
          c.itemA.name.toLowerCase().includes(query) ||
          c.itemB.name.toLowerCase().includes(query) ||
          c.itemA.brand.toLowerCase().includes(query) ||
          c.itemB.brand.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
        );
      }).slice(0, 5)
    : [];

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div
            id="brand-logo"
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Spec<span className="text-indigo-600">Versus</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Compare
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
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
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
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
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in-50 duration-100">
                <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <span>Instant Comparison Matches</span>
                  <span>{filteredQuickResults.length} found</span>
                </div>

                {filteredQuickResults.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {filteredQuickResults.map((item) => (
                      <div
                        key={item.slug}
                        onClick={() => {
                          onSelectComparison(item.slug);
                          setIsSearchFocused(false);
                        }}
                        className="p-3 hover:bg-indigo-50/60 cursor-pointer flex items-center justify-between gap-2 transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {item.itemA.name} <span className="text-indigo-600 font-normal">vs</span> {item.itemB.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {item.category} • Winner: <span className="font-semibold text-slate-700">{item.verdict.winner}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No exact comparisons found for "{searchTerm}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {currentSlug && onOpenSchema && (
              <button
                id="view-schema-btn"
                type="button"
                onClick={onOpenSchema}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="View JSON-LD SEO Schema"
              >
                <Code className="w-3.5 h-3.5 text-indigo-600" />
                <span>JSON-LD</span>
              </button>
            )}

            <button
              id="all-comparisons-nav-btn"
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Browse All</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
