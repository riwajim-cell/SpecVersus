import React from 'react';
import { Scale, ShieldCheck, FileText, Mail, Info, Heart } from 'lucide-react';
import { ModalType } from '../types';
import { allCategories } from '../data/comparisons';

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
  onSelectCategory: (category: string) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenModal,
  onSelectCategory,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900">
                Spec<span className="text-indigo-600">Versus</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Automated, programmatic tech specifications & showdown engine designed to empower smarter purchasing decisions.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} SpecVersus Media Inc. All rights reserved.
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Explore Categories
            </h4>
            <ul className="space-y-2">
              {allCategories.slice(1, 6).map((cat) => (
                <li key={cat}>
                  <button
                    id={`footer-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateHome();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-500 hover:underline"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Categories */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Flagship Indexes
            </h4>
            <ul className="space-y-2">
              {allCategories.slice(6).map((cat) => (
                <li key={cat}>
                  <button
                    id={`footer-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateHome();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-500 hover:underline"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Trust & Legal Compliance
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  id="footer-privacy-btn"
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-slate-600"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-terms-btn"
                  type="button"
                  onClick={() => onOpenModal('terms')}
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-slate-600"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-about-btn"
                  type="button"
                  onClick={() => onOpenModal('about')}
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-slate-600"
                >
                  <Info className="w-3.5 h-3.5 text-purple-600" />
                  <span>About Us & Editorial Standards</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-contact-btn"
                  type="button"
                  onClick={() => onOpenModal('contact')}
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-slate-600"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>Contact Editorial Team</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-700">Editorial & Affiliate Disclosure:</strong> SpecVersus is an independent technological comparison publication. We independently research, benchmark, and evaluate products. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. Advertisements served via Google AdSense are clearly delineated and marked.
          </p>
        </div>
      </div>
    </footer>
  );
};
