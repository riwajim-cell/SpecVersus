import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, ChevronDown, ExternalLink } from 'lucide-react';

export interface SplitPriceButtonProps {
  slug: string;
  productName: string;
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'dark' | 'indigo' | 'amber';
}

interface StoreOption {
  id: string;
  name: string;
  tag: string;
  colorBadge: string;
}

export const SplitPriceButton: React.FC<SplitPriceButtonProps> = ({
  slug,
  productName,
  className = '',
  size = 'sm',
  variant = 'dark',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape press
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const amazonUrl = `/out/${slug}?q=${encodeURIComponent(productName)}&m=amazon`;

  const alternativeStores: StoreOption[] = [
    {
      id: 'bestbuy',
      name: 'Best Buy',
      tag: 'Official Partner',
      colorBadge: 'bg-yellow-400 text-slate-950 font-bold',
    },
    {
      id: 'walmart',
      name: 'Walmart',
      tag: 'Free Shipping',
      colorBadge: 'bg-blue-600 text-white font-semibold',
    },
  ];

  // Visual variants
  const variantStyles = {
    dark: {
      bg: 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white',
      border: 'border-slate-800',
      divider: 'border-slate-700/70',
      dropdownHover: 'hover:bg-slate-800',
    },
    indigo: {
      bg: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white',
      border: 'border-indigo-700',
      divider: 'border-indigo-500/60',
      dropdownHover: 'hover:bg-indigo-700',
    },
    amber: {
      bg: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white',
      border: 'border-amber-700',
      divider: 'border-amber-500/60',
      dropdownHover: 'hover:bg-amber-700',
    },
  }[variant];

  const isSmall = size === 'sm';

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-flex rounded-lg shadow-2xs ${className}`}
    >
      {/* Main Amazon Outbound Link Button */}
      <a
        href={amazonUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className={`inline-flex items-center gap-1.5 font-medium transition-colors select-none rounded-l-lg border ${variantStyles.bg} ${variantStyles.border} ${
          isSmall ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
        } focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40`}
        title={`Check price for ${productName} on Amazon`}
      >
        <ShoppingCart className={isSmall ? 'w-3.5 h-3.5 text-amber-400' : 'w-4 h-4 text-amber-400'} />
        <span className="whitespace-nowrap font-semibold">Check on Amazon</span>
      </a>

      {/* Split Dropdown Trigger */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="More store options"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center justify-center rounded-r-lg border border-l-0 ${variantStyles.bg} ${variantStyles.border} ${variantStyles.divider} ${variantStyles.dropdownHover} ${
          isSmall ? 'px-1.5 py-1.5' : 'px-2 py-2'
        } transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40`}
      >
        <ChevronDown
          className={`text-slate-200 transition-transform duration-150 ${
            isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100 divide-y divide-slate-100"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Other Retailers
          </div>

          <div className="py-1">
            {alternativeStores.map((store) => {
              const storeUrl = `/out/${slug}?q=${encodeURIComponent(productName)}&m=${store.id}`;
              return (
                <a
                  key={store.id}
                  href={storeUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {store.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-600">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      Check Price
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="px-3 py-1.5 bg-slate-50/70 text-[10px] text-slate-400 flex items-center justify-between rounded-b-xl">
            <span>Affiliate disclosures apply</span>
          </div>
        </div>
      )}
    </div>
  );
};
