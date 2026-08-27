import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Battery,
  Tv,
  Cpu,
  HardDrive,
  Camera,
  Weight,
  Layers,
  Wifi
} from 'lucide-react';
import { ProductItem } from '../types';
import { SplitPriceButton } from './SplitPriceButton';
import { getCanonicalSlug } from '../utils/comparator';
import { AdBanner } from './AdBanner';

interface ProductHubViewProps {
  product: ProductItem;
  allProducts: ProductItem[];
  onNavigateHome: () => void;
  onSelectProduct: (id: string) => void;
  onSelectComparison: (slug: string) => void;
}

export const ProductHubView: React.FC<ProductHubViewProps> = ({
  product,
  allProducts,
  onNavigateHome,
  onSelectProduct,
  onSelectComparison,
}) => {
  // Update document title
  useEffect(() => {
    document.title = `${product.name} Specs, Price & Comparisons | SpecVersus`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Find top alternatives in the same category (or other categories if needed)
  const alternatives = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackAlternatives = alternatives.length > 0
    ? alternatives
    : allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const specIconMap: Record<string, React.ReactNode> = {
    battery: <Battery className="w-4 h-4 text-emerald-600" />,
    display: <Tv className="w-4 h-4 text-sky-600" />,
    processor: <Cpu className="w-4 h-4 text-indigo-600" />,
    storage: <HardDrive className="w-4 h-4 text-purple-600" />,
    camera: <Camera className="w-4 h-4 text-amber-600" />,
    weight: <Weight className="w-4 h-4 text-slate-600" />,
    os: <Layers className="w-4 h-4 text-teal-600" />,
    connectivity: <Wifi className="w-4 h-4 text-blue-600" />
  };

  return (
    <div id="product-hub-page" className="space-y-8 pb-16">
      {/* Top Breadcrumb & Back button */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="cursor-pointer hover:underline" onClick={onNavigateHome}>Home</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">{product.category}</span>
          <span>/</span>
          <span className="font-bold text-slate-900 truncate max-w-[180px]">{product.name}</span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            {product.summary && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                {product.summary}
              </p>
            )}
          </div>

          {/* Pricing & Primary CTA */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 w-full lg:w-80 flex-shrink-0 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">MSRP / Retail</span>
                <span className="text-3xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{product.rating} / 5.0</span>
              </div>
            </div>

            <div className="pt-2">
              <SplitPriceButton
                slug={`product-${product.id}`}
                productName={product.name}
                size="md"
                className="w-full"
              />
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Pricing</span>
              <span className="text-indigo-600 font-medium">Free US Shipping</span>
            </div>
          </div>
        </div>

        {/* Pros & Cons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Pros */}
          <div className="bg-emerald-50/40 rounded-2xl p-5 border border-emerald-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Advantages & Highlights</span>
            </h3>
            <ul className="space-y-2">
              {product.pros.map((pro, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Potential Drawbacks</span>
            </h3>
            <ul className="space-y-2">
              {product.cons.map((con, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 flex-shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdBanner type="in-article" />

      {/* Detailed Technical Specifications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Full Technical Specifications
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {Object.keys(product.specs).length} verified specs
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {Object.entries(product.specs).map(([key, val], idx) => {
            if (!val) return null;
            const icon = specIconMap[key.toLowerCase()] || <Sparkles className="w-4 h-4 text-slate-400" />;
            const label = key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <div
                key={key}
                className={`p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:w-1/3">
                  <span className="p-1 rounded-md bg-slate-100 text-slate-600">{icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{label}</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 sm:w-2/3 leading-relaxed">
                  {val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compare with Recommended Alternatives Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              <span>Head-to-Head Alternatives to Compare</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Popular showdowns against competing {product.category.toLowerCase()}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fallbackAlternatives.map((alt) => {
            const comparisonSlug = getCanonicalSlug(product.id, alt.id);
            return (
              <div
                key={alt.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Alternative Choice
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {alt.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {alt.brand} • ${alt.price.toFixed(2)} • ★ {alt.rating}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProduct(alt.id)}
                    className="text-xs text-indigo-600 hover:underline font-medium"
                  >
                    View Specs
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">
                    {product.name} <span className="text-indigo-600 font-bold">vs</span> {alt.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectComparison(comparisonSlug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Compare Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
