import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Mail, Info, CheckCircle, Send, HelpCircle, ExternalLink, Sparkles, AlertCircle, Database, Layers, Check } from 'lucide-react';
import { ModalType } from '../types';

interface PolicyModalProps {
  type: ModalType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const [contactSent, setContactSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Specification Correction');
  const [contactMsg, setContactMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [type, onClose]);

  if (!type || type === 'schema') return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setContactSent(true);
    }, 600);
  };

  const handleResetForm = () => {
    setContactSent(false);
    setContactName('');
    setContactEmail('');
    setContactTopic('Specification Correction');
    setContactMsg('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        id="policy-modal-card"
        className="relative bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            {type === 'privacy' && (
              <div className="p-2.5 rounded-xl bg-emerald-100/80 text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
            {type === 'terms' && (
              <div className="p-2.5 rounded-xl bg-indigo-100/80 text-indigo-700">
                <FileText className="w-5 h-5" />
              </div>
            )}
            {type === 'about' && (
              <div className="p-2.5 rounded-xl bg-purple-100/80 text-purple-700">
                <Info className="w-5 h-5" />
              </div>
            )}
            {type === 'contact' && (
              <div className="p-2.5 rounded-xl bg-sky-100/80 text-sky-700">
                <Mail className="w-5 h-5" />
              </div>
            )}

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms of Service'}
                {type === 'about' && 'About Us & Comparison Methodology'}
                {type === 'contact' && 'Contact Editorial Team'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {type === 'about'
                  ? 'How we test, benchmark, and evaluate tech specs'
                  : 'Official Legal & Editorial Disclosure • SpecVersus'}
              </p>
            </div>
          </div>

          <button
            id="close-policy-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* ================= PRIVACY POLICY ================= */}
          {type === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 font-medium leading-normal flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Summary:</strong> SpecVersus respects your digital privacy. We do not require account registration, do not sell personal data, and maintain transparent standards regarding cookies, third-party advertising partners like Google AdSense, and affiliate tracking.
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">1. Information We Collect</h4>
                <p>
                  We only collect standard non-personally identifiable diagnostic and traffic information when you visit SpecVersus:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Log Files & Telemetry:</strong> Standard server logs including browser type, referring/exit pages, operating system, timestamp, and anonymous IP address hashing.</li>
                  <li><strong>Device Characteristics:</strong> Screen resolution, viewport dimensions, and rendering capabilities used strictly to format side-by-side spec comparison tables cleanly.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">2. Cookies & Web Beacons</h4>
                <p>
                  SpecVersus uses cookies to remember user preferences (such as category filtering or dark/light modes) and to measure website performance:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Essential Cookies:</strong> Necessary for core site navigation and URL state persistence.</li>
                  <li><strong>Analytical Cookies:</strong> Aggregated measurement tools that help us see which comparisons are most requested so we can update relevant benchmarks.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">3. Third-Party Advertising & Google AdSense</h4>
                <p>
                  We partner with third-party vendors, including <strong>Google AdSense</strong>, to serve advertisements on our web pages:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Google uses cookies (such as the DoubleClick DART cookie) to serve ads to users based on their visit to this website and other websites across the Internet.</li>
                  <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline inline-flex items-center gap-0.5">Google Ads Settings <ExternalLink className="w-3 h-3" /></a> or by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline inline-flex items-center gap-0.5">www.aboutads.info <ExternalLink className="w-3 h-3" /></a>.</li>
                  <li>Ad impressions and placements on SpecVersus are clearly designated and isolated from our algorithmic and editorial verdicts.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">4. Affiliate Programs & Outbound Tracking</h4>
                <p>
                  SpecVersus participates in retail affiliate marketing programs (such as Amazon Associates, Walmart, and Best Buy). When you click a "Check on Amazon" or merchant link, a secure outbound redirect assigns a referral cookie to credit our platform for referring the purchase. This is at zero additional cost to you.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">5. Global Compliance (GDPR, UK GDPR, CCPA/CPRA)</h4>
                <p>
                  If you reside in the European Economic Area (EEA), United Kingdom, or California, you possess statutory rights regarding access, deletion, and restriction of data processing. Because we do not maintain persistent user accounts or collect personally identifiable identities, requests can be verified and fulfilled by emailing our compliance desk.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">6. Contacting Privacy Desk</h4>
                <p>
                  For any questions regarding this Privacy Policy or cookie management, please reach out via our contact form or directly at <span className="font-mono text-slate-800 font-semibold">privacy@specversus.dpdns.org</span>.
                </p>
              </section>
            </div>
          )}

          {/* ================= TERMS OF SERVICE ================= */}
          {type === 'terms' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-100 rounded-xl text-xs text-slate-700 leading-normal">
                <strong>Agreement to Terms:</strong> By accessing or using the SpecVersus website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may discontinue use of the website.
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">1. Use of Content & Spec Comparison Engine</h4>
                <p>
                  SpecVersus provides automated and editorial head-to-head tech comparisons for informational, educational, and consumer reference purposes only. You agree not to scrape, reverse-engineer, or deploy automated scrapers without written permission.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">2. Accuracy of Specs, Benchmarks & Prices</h4>
                <p>
                  Technical specifications are compiled from manufacturer spec sheets, laboratory disclosures, and certified benchmark suites. While we strive for absolute precision:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Retail pricing, discounts, and merchant stock levels fluctuate continuously and are subject to change without notice.</li>
                  <li>Always verify current pricing, compatibility, and manufacturer warranty details on the merchant's checkout page before completing a purchase.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">3. Intellectual Property & Trademarks</h4>
                <p>
                  All proprietary layout formats, scoring algorithms, and written verdicts are the property of SpecVersus Media. All product names, logos, registered trademarks, and brand names (e.g., Apple, Samsung, Sony, Bose, Dell, Asus) are trademarks or registered trademarks of their respective owners.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">4. Limitation of Liability</h4>
                <p>
                  In no event shall SpecVersus or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the purchase or use of any product compared on this website.
                </p>
              </section>
            </div>
          )}

          {/* ================= ABOUT US & METHODOLOGY ================= */}
          {type === 'about' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-slate-900 text-base">The SpecVersus Mission</h4>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  SpecVersus was founded on a simple principle: <strong>tech shoppers need direct, data-backed answers without wading through sponsored filler</strong>. We strip away marketing hype to deliver fast, clear, side-by-side comparisons designed to help you choose the right gadget at the right price.
                </p>
              </div>

              {/* 5-Step Methodology Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Our 4-Pillar Comparison Methodology</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">1</div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Empirical Spec Ingestion</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      We harvest technical specifications directly from official OEM whitepapers, FCC filings, display test results, and silicon architectural manuals.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">2</div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Standardized Normalization</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      Every feature is normalized to universal units (e.g., peak nits, mAh battery capacity, Geekbench scores, PPI density) for truly fair side-by-side showdowns.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">3</div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Neutral Scoring Algorithm</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      Our scoring engine computes winning metrics by weighing processor performance, battery longevity, camera sensors, and ergonomics without human bias.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">4</div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Price-to-Value Indexing</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      Raw performance is combined with retail MSRP to determine true price-to-value, establishing whether premium upgrades are genuinely worth the cost.
                    </p>
                  </div>
                </div>
              </div>

              {/* Zero Bias Guarantee */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Strict Zero Paid Placement Guarantee</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Manufacturers cannot pay for higher verdict scores, badges, or favorable head-to-head comparisons. All verdicts are calculated algorithmically and verified by our editorial guidelines.
                </p>
              </div>
            </div>
          )}

          {/* ================= CONTACT FORM ================= */}
          {type === 'contact' && (
            <div>
              {contactSent ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">Message Received!</h4>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                      Thank you for contacting SpecVersus, <strong className="text-slate-800">{contactName}</strong>. Our editorial team reviews submissions daily and will respond to <strong className="text-slate-800">{contactEmail}</strong> if follow-up is required.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Have a specification correction, new gadget showdown request, or editorial inquiry? Fill out the form below or email <span className="font-semibold text-slate-800">editorial@specversus.dpdns.org</span>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 bg-slate-50/50 text-slate-800"
                    >
                      <option value="Specification Correction">Specification Correction / Data Update</option>
                      <option value="New Comparison Request">Request a New Product Comparison</option>
                      <option value="Editorial & Methodology">Editorial Methodology & Feedback</option>
                      <option value="Advertising & Partnerships">Advertising & Monetization Inquiries</option>
                      <option value="General Question">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Please describe the product models, specific spec discrepancy, or inquiry..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 bg-slate-50/50 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      Average response time: &lt; 24-48 business hours
                    </span>

                    <button
                      id="submit-contact-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-medium">
            SpecVersus Compliance & Legal Standards
          </div>

          <button
            id="close-modal-footer-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200/90 text-slate-700 hover:bg-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
