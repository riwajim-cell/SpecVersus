import React, { useState } from 'react';
import { SlidersHorizontal, Battery, Tv, Cpu, HardDrive, Camera, DollarSign, Star, Check, Sparkles, ShoppingCart } from 'lucide-react';
import { ProductItem } from '../types';
import { SplitPriceButton } from './SplitPriceButton';

interface SpecComparisonTableProps {
  itemA: ProductItem;
  itemB: ProductItem;
  slug: string;
}

interface SpecRow {
  key: string;
  label: string;
  icon: React.ReactNode;
  valA: string;
  valB: string;
  isDifferent: boolean;
}

export const SpecComparisonTable: React.FC<SpecComparisonTableProps> = ({ itemA, itemB, slug }) => {
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  // Define spec label mapping and relevant icons
  const specKeyMap: Record<string, { label: string; icon: React.ReactNode }> = {
    battery: { label: 'Battery & Power', icon: <Battery className="w-4 h-4 text-emerald-600" /> },
    display: { label: 'Display & Screen', icon: <Tv className="w-4 h-4 text-sky-600" /> },
    processor: { label: 'Processor & Chipset', icon: <Cpu className="w-4 h-4 text-indigo-600" /> },
    storage: { label: 'Storage & Memory Options', icon: <HardDrive className="w-4 h-4 text-purple-600" /> },
    camera: { label: 'Camera System & Sensors', icon: <Camera className="w-4 h-4 text-amber-600" /> },
  };

  // Extract all unique spec keys from both items
  const allSpecKeys = Array.from(
    new Set([...Object.keys(itemA.specs), ...Object.keys(itemB.specs)])
  );

  // Build rows and filter out rows where both items have N/A or empty values
  const rows: SpecRow[] = [];

  // Add Price row
  rows.push({
    key: 'price',
    label: 'Starting Price (MSRP)',
    icon: <DollarSign className="w-4 h-4 text-emerald-600" />,
    valA: `$${itemA.price.toFixed(2)}`,
    valB: `$${itemB.price.toFixed(2)}`,
    isDifferent: itemA.price !== itemB.price,
  });

  // Add Rating row
  rows.push({
    key: 'rating',
    label: 'Overall User Rating',
    icon: <Star className="w-4 h-4 text-amber-500 fill-amber-400" />,
    valA: `★ ${itemA.rating} / 5.0`,
    valB: `★ ${itemB.rating} / 5.0`,
    isDifferent: itemA.rating !== itemB.rating,
  });

  // Add specs rows
  for (const key of allSpecKeys) {
    const rawValA = itemA.specs[key] || 'N/A';
    const rawValB = itemB.specs[key] || 'N/A';

    // Filter out rows if BOTH are N/A or start with N/A
    const isValANa = rawValA.trim().toUpperCase().startsWith('N/A');
    const isValBNa = rawValB.trim().toUpperCase().startsWith('N/A');

    if (isValANa && isValBNa) {
      continue; // Skip irrelevant N/A row
    }

    const mapping = specKeyMap[key] || {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      icon: <Sparkles className="w-4 h-4 text-slate-500" />,
    };

    rows.push({
      key,
      label: mapping.label,
      icon: mapping.icon,
      valA: rawValA,
      valB: rawValB,
      isDifferent: rawValA.trim().toLowerCase() !== rawValB.trim().toLowerCase(),
    });
  }

  const displayedRows = onlyDifferences ? rows.filter((r) => r.isDifferent) : rows;

  return (
    <section id="specs-table-section" className="mb-10 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            <span>Technical Specifications Comparison</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Side-by-side technical breakdown with verified hardware metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              id="highlight-diff-toggle"
              type="checkbox"
              checked={onlyDifferences}
              onChange={(e) => setOnlyDifferences(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            <span className="ml-2.5 text-xs font-medium text-slate-700">
              Show Differences Only
            </span>
          </label>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-white">
              <th className="py-4 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-slate-400 w-1/4 align-top">
                Feature / Spec
              </th>
              <th className="py-4 px-4 sm:px-6 text-sm font-bold text-slate-900 w-[37.5%] bg-slate-50/40 border-l border-slate-200/60 align-top">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{itemA.brand}</span>
                      <span className="text-base text-slate-900">{itemA.name}</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md self-start">${itemA.price.toFixed(2)}</span>
                  </div>
                  <div className="pt-0.5">
                    <SplitPriceButton slug={slug} productName={itemA.name} size="sm" />
                  </div>
                </div>
              </th>
              <th className="py-4 px-4 sm:px-6 text-sm font-bold text-slate-900 w-[37.5%] bg-slate-50/40 border-l border-slate-200/60 align-top">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{itemB.brand}</span>
                      <span className="text-base text-slate-900">{itemB.name}</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md self-start">${itemB.price.toFixed(2)}</span>
                  </div>
                  <div className="pt-0.5">
                    <SplitPriceButton slug={slug} productName={itemB.name} size="sm" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {displayedRows.map((row, idx) => (
              <tr
                key={row.key}
                className={`transition-colors hover:bg-slate-50/60 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'
                }`}
              >
                {/* Spec Label */}
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-slate-100/80 flex-shrink-0">{row.icon}</span>
                    <span className="font-semibold text-slate-800">{row.label}</span>
                  </div>
                </td>

                {/* Item A Spec */}
                <td className="py-3.5 px-4 sm:px-6 text-slate-800 border-l border-slate-100 font-normal leading-relaxed">
                  {row.valA.startsWith('N/A') ? (
                    <span className="text-slate-400 italic text-xs">{row.valA}</span>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      <span className="text-slate-700">{row.valA}</span>
                    </div>
                  )}
                </td>

                {/* Item B Spec */}
                <td className="py-3.5 px-4 sm:px-6 text-slate-800 border-l border-slate-100 font-normal leading-relaxed">
                  {row.valB.startsWith('N/A') ? (
                    <span className="text-slate-400 italic text-xs">{row.valB}</span>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      <span className="text-slate-700">{row.valB}</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {/* Bottom Action / Where to Buy Row */}
            <tr className="bg-slate-50/80 border-t-2 border-slate-200">
              <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-100 text-indigo-700 flex-shrink-0">
                    <ShoppingCart className="w-4 h-4" />
                  </span>
                  <span>Where to Buy</span>
                </div>
              </td>
              <td className="py-4 px-4 sm:px-6 border-l border-slate-200">
                <SplitPriceButton slug={slug} productName={itemA.name} size="sm" />
              </td>
              <td className="py-4 px-4 sm:px-6 border-l border-slate-200">
                <SplitPriceButton slug={slug} productName={itemB.name} size="sm" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table Footer Notes */}
      <div className="p-4 bg-slate-50/60 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>* Specs verified against manufacturer benchmarks and regulatory disclosures.</span>
        <span className="text-indigo-600 font-medium">{displayedRows.length} attributes compared</span>
      </div>
    </section>
  );
};
