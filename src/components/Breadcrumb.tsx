import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  category: string;
  itemAName: string;
  itemBName: string;
  onNavigateHome: () => void;
  onSelectCategory: (category: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  category,
  itemAName,
  itemBName,
  onNavigateHome,
  onSelectCategory,
}) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-slate-500 py-3 overflow-x-auto whitespace-nowrap">
      <button
        id="breadcrumb-home-btn"
        type="button"
        onClick={onNavigateHome}
        className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors font-medium text-slate-600"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 flex-shrink-0" />

      <button
        id="breadcrumb-category-btn"
        type="button"
        onClick={() => {
          onSelectCategory(category);
          onNavigateHome();
        }}
        className="hover:text-indigo-600 transition-colors font-medium text-slate-600"
      >
        {category}
      </button>

      <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 flex-shrink-0" />

      <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">
        {itemAName} vs {itemBName}
      </span>
    </nav>
  );
};
