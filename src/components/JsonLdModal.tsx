import React, { useState } from 'react';
import { Code, Copy, Check, X } from 'lucide-react';
import { Comparison } from '../types';
import { generateSchemaJsonLd } from '../data/comparisons';

interface JsonLdModalProps {
  comparison: Comparison | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JsonLdModal: React.FC<JsonLdModalProps> = ({ comparison, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !comparison) return null;

  const jsonLdCode = generateSchemaJsonLd(comparison);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonLdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        id="schema-modal-content"
        className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Programmatic SEO (pSEO) Schema.org Markup
              </h3>
              <p className="text-xs text-slate-500">
                Embedded JSON-LD for Google Rich Snippets (ProductGroup & FAQPage)
              </p>
            </div>
          </div>
          <button
            id="close-schema-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto font-mono text-xs bg-slate-950 text-slate-200 flex-1">
          <pre className="whitespace-pre-wrap">{jsonLdCode}</pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Validated against Schema.org 2026 specs
          </span>
          <button
            id="copy-schema-btn"
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy JSON-LD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
