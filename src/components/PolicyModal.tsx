import React from 'react';
import { X, ShieldCheck, FileText, Mail, Info, CheckCircle, Send } from 'lucide-react';
import { ModalType } from '../types';

interface PolicyModalProps {
  type: ModalType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const [contactSent, setContactSent] = React.useState(false);
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMsg, setContactMsg] = React.useState('');

  if (!type || type === 'schema') return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        id="policy-modal-card"
        className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' && (
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
            {type === 'terms' && (
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <FileText className="w-5 h-5" />
              </div>
            )}
            {type === 'contact' && (
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                <Mail className="w-5 h-5" />
              </div>
            )}
            {type === 'about' && (
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <Info className="w-5 h-5" />
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-slate-900">
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms of Service'}
                {type === 'contact' && 'Contact Editorial Team'}
                {type === 'about' && 'About SpecVersus & Editorial Standards'}
              </h3>
              <p className="text-xs text-slate-500">
                Last updated: August 2026 • Compliance & User Rights
              </p>
            </div>
          </div>

          <button
            id="close-policy-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                <strong>SpecVersus</strong> values your privacy. This Privacy Policy details our protocols regarding data collection, cookies, and programmatic ad personalization under global standards (GDPR, CCPA).
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">1. Data Collection & Analytics</h4>
              <p>
                We do not require account registration to access comparison databases. Anonymous web traffic analytics (e.g. pageviews, referrer URLs, and device categories) are aggregated to optimize site performance and comparison index speed.
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">2. Google AdSense & Third-Party Cookies</h4>
              <p>
                We partner with Google AdSense to serve relevant ads. Google uses cookies to serve ads based on prior visits. Users may opt out of personalized advertising by visiting Google Ad Settings.
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">3. Affiliate Disclosures</h4>
              <p>
                Product pricing and retail links may contain affiliate tags. When you purchase through verified retail links, we may earn an affiliate commission at zero additional cost to you.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                By using <strong>SpecVersus</strong>, you agree to comply with and be bound by the following terms and conditions of use.
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">1. Accurate Benchmarking & Spec Data</h4>
              <p>
                All specifications, benchmarks, and comparison matrices are compiled from verified OEM technical sheets, laboratory tests, and manufacturer disclosures. While we strive for 100% accuracy, prices and stock availability are subject to retailer fluctuations.
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">2. Intellectual Property</h4>
              <p>
                The editorial verdicts, comparison formats, and structured programmatic architectures are protected by copyright. Product brand names and registered trademarks remain the property of their respective owners.
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">3. Limitation of Liability</h4>
              <p>
                SpecVersus is an independent consumer technology publication. We are not liable for purchasing decisions made based solely on automated spec comparisons.
              </p>
            </>
          )}

          {type === 'about' && (
            <>
              <p>
                <strong>SpecVersus</strong> is an automated, high-velocity Programmatic SEO (pSEO) comparison platform built to deliver immediate, objective head-to-head tech showdowns.
              </p>
              <h4 className="font-bold text-slate-900 pt-2 text-sm">Our Testing Methodology</h4>
              <p>
                Every comparison synthesizes verified battery endurance tests, display brightness metrics, silicon benchmarks, sensor capabilities, and pricing indexes into clear, actionable advice.
              </p>
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">100% Objective</div>
                  <div className="text-slate-500 text-xs">No brand bias or paid placements in verdicts</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">Schema.org Ready</div>
                  <div className="text-slate-500 text-xs">Built for next-gen search engine indexation</div>
                </div>
              </div>
              <p>
                Whether you're torn between the latest flagship smartphones, lightweight laptops, or premium noise-cancelling headphones, SpecVersus cuts through marketing jargon to show you exactly what matters.
              </p>
            </>
          )}

          {type === 'contact' && (
            <div>
              {contactSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-500">
                    Thank you for reaching out. Our editorial team will review your query within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <p className="text-xs text-slate-600">
                    Have a specification correction, new comparison suggestion, or advertising inquiry? Get in touch with our editorial team.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Suggestion</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Detail your inquiry or suggested comparison..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      id="submit-contact-btn"
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            id="close-modal-footer-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
