import React, { useEffect, useState } from 'react';
import { ExternalLink, ShoppingCart, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface OutboundRedirectViewProps {
  slug: string;
  query: string;
  merchant: string;
  onNavigateHome: () => void;
}

export const OutboundRedirectView: React.FC<OutboundRedirectViewProps> = ({
  slug,
  query,
  merchant,
  onNavigateHome,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(2);

  const merchantNames: Record<string, string> = {
    amazon: 'Amazon.com',
    bestbuy: 'Best Buy',
    walmart: 'Walmart',
  };

  const merchantUrls: Record<string, string> = {
    amazon: `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=specversus-20`,
    bestbuy: `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}`,
    walmart: `https://www.walmart.com/search?q=${encodeURIComponent(query)}`,
  };

  const merchantTitle = merchantNames[merchant.toLowerCase()] || 'Retail Merchant';
  const targetUrl = merchantUrls[merchant.toLowerCase()] || `https://www.google.com/search?q=${encodeURIComponent(query + ' price')}`;

  useEffect(() => {
    // Log simulated GA4 affiliate click
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'affiliate_click', {
        event_category: 'Outbound',
        event_label: `${merchantTitle} - ${query}`,
        value: 1,
      });
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = targetUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [merchantTitle, query, targetUrl]);

  return (
    <div id="outbound-redirect-container" className="max-w-md mx-auto my-16 bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto animate-bounce">
        <ShoppingCart className="w-8 h-8 text-amber-500" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
          Outbound Price Referral
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Connecting to {merchantTitle}...
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Redirecting you to view live verified pricing and stock availability for <strong className="text-slate-800 font-semibold">"{query}"</strong>.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
        <div className="text-xs text-slate-600 font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Automatic transfer in <strong>{secondsLeft}s</strong></span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${((2 - secondsLeft) / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <a
          href={targetUrl}
          rel="nofollow sponsored noopener"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-all shadow-xs"
        >
          <span>Proceed Directly to {merchantTitle}</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 pt-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & return to comparison</span>
        </button>
      </div>
    </div>
  );
};
