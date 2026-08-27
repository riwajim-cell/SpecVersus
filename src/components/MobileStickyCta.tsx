import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductItem } from '../types';

interface MobileStickyCtaProps {
  itemA: ProductItem;
  itemB: ProductItem;
  slug: string;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ itemA, itemB, slug }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show smoothly after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial position in case page was reloaded scrolled down
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPriceDisplay = (price: number) => {
    return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
  };

  return (
    <div
      id="mobile-sticky-cta"
      aria-label="Quick Price Check Bar"
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-all duration-300 ease-out md:hidden ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-md mx-auto px-3 py-2 sm:px-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Item A Button */}
          <a
            id="mobile-cta-item-a"
            href={`/out/${slug}?q=${encodeURIComponent(itemA.name)}&m=amazon`}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="flex flex-col justify-between p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 transition-colors shadow-2xs group border border-slate-800"
            title={`Check price for ${itemA.name} on Amazon`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5 min-w-0">
              <span className="text-[11px] font-bold text-slate-100 truncate leading-tight">
                {itemA.name}
              </span>
              <span className="text-[11px] font-bold text-amber-400 flex-shrink-0 ml-1">
                {getPriceDisplay(itemA.price)}
              </span>
            </div>
            <div className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
              <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
              <span className="whitespace-nowrap">Check Price</span>
            </div>
          </a>

          {/* Item B Button */}
          <a
            id="mobile-cta-item-b"
            href={`/out/${slug}?q=${encodeURIComponent(itemB.name)}&m=amazon`}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="flex flex-col justify-between p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 transition-colors shadow-2xs group border border-slate-800"
            title={`Check price for ${itemB.name} on Amazon`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5 min-w-0">
              <span className="text-[11px] font-bold text-slate-100 truncate leading-tight">
                {itemB.name}
              </span>
              <span className="text-[11px] font-bold text-amber-400 flex-shrink-0 ml-1">
                {getPriceDisplay(itemB.price)}
              </span>
            </div>
            <div className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
              <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
              <span className="whitespace-nowrap">Check Price</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
