import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ComparisonView } from './components/ComparisonView';
import { ProductHubView } from './components/ProductHubView';
import { AdminDashboard } from './components/AdminDashboard';
import { OutboundRedirectView } from './components/OutboundRedirectView';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { JsonLdModal } from './components/JsonLdModal';
import { ModalType, Comparison, ProductItem, ViewRoute } from './types';
import {
  getProducts,
  defaultProducts
} from './lib/supabase';
import {
  buildComparisonsFromProducts,
  getComparisonBySlug
} from './data/comparisons';
import { parseComparisonSlug, getCanonicalSlug } from './utils/comparator';

export default function App() {
  const [products, setProducts] = useState<ProductItem[]>(defaultProducts);
  const [comparisons, setComparisons] = useState<Comparison[]>(() =>
    buildComparisonsFromProducts(defaultProducts)
  );

  const [route, setRoute] = useState<ViewRoute>({ type: 'home' });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // Dark Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('specversus_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('specversus_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('specversus_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Fetch products from Supabase / localStorage on mount and when refreshed
  const loadProducts = useCallback(async () => {
    try {
      const items = await getProducts();
      if (items && items.length > 0) {
        setProducts(items);
        setComparisons(buildComparisonsFromProducts(items));
      }
    } catch (e) {
      console.error('Error loading products:', e);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Synchronize router state with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      const [path, queryString] = rawHash.split('?');
      const params = new URLSearchParams(queryString || '');

      if (path.startsWith('compare/')) {
        const slug = path.replace('compare/', '').trim();
        // Canonical slug guard check
        const parsed = parseComparisonSlug(slug);
        if (parsed && !parsed.isCanonical) {
          // Redirect to canonical slug in URL hash
          window.location.hash = `compare/${parsed.canonicalSlug}`;
          setRoute({ type: 'compare', slug: parsed.canonicalSlug });
        } else {
          setRoute({ type: 'compare', slug });
        }
      } else if (path.startsWith('product/')) {
        const id = path.replace('product/', '').trim();
        setRoute({ type: 'product', id });
      } else if (path === 'admin') {
        setRoute({ type: 'admin' });
      } else if (path.startsWith('out/')) {
        const slug = path.replace('out/', '').trim();
        const query = params.get('q') || 'Tech Product';
        const merchant = params.get('m') || 'amazon';
        setRoute({ type: 'out', slug, query, merchant });
      } else if (path.startsWith('category/')) {
        const cat = decodeURIComponent(path.replace('category/', ''));
        setSelectedCategory(cat);
        setRoute({ type: 'home' });
      } else if (path === 'privacy' || path === 'privacy-policy') {
        setActiveModal('privacy');
      } else if (path === 'terms' || path === 'terms-of-service') {
        setActiveModal('terms');
      } else if (path === 'about' || path === 'about-us') {
        setActiveModal('about');
      } else if (path === 'contact' || path === 'contact-us') {
        setActiveModal('contact');
      } else {
        setRoute({ type: 'home' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handlers
  const handleSelectComparison = (slug: string) => {
    const parsed = parseComparisonSlug(slug);
    const targetSlug = parsed ? parsed.canonicalSlug : slug;
    window.location.hash = `compare/${targetSlug}`;
    setRoute({ type: 'compare', slug: targetSlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (id: string) => {
    window.location.hash = `product/${id}`;
    setRoute({ type: 'product', id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setRoute({ type: 'admin' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    window.location.hash = '';
    setRoute({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (route.type !== 'home') {
      window.location.hash = category === 'All' ? '' : `category/${encodeURIComponent(category)}`;
      setRoute({ type: 'home' });
    }
  };

  // Active Comparison Calculation
  const activeComparison: Comparison | null =
    route.type === 'compare' ? getComparisonBySlug(route.slug, products) : null;

  // Active Product Calculation
  const activeProduct: ProductItem | null =
    route.type === 'product' ? products.find((p) => p.id === route.id) || null : null;

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Global Header */}
      <Header
        onNavigateHome={handleNavigateHome}
        onSelectComparison={handleSelectComparison}
        onSelectProduct={handleSelectProduct}
        onOpenAdmin={handleOpenAdmin}
        onOpenSchema={() => setIsSchemaModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentSlug={route.type === 'compare' ? route.slug : null}
        comparisons={comparisons}
        products={products}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {route.type === 'home' && (
          <HomeView
            comparisons={comparisons}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onSelectComparison={handleSelectComparison}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        )}

        {route.type === 'compare' && (
          <ComparisonView
            comparison={activeComparison}
            onNavigateHome={handleNavigateHome}
            onSelectCategory={handleSelectCategory}
            onSelectComparison={handleSelectComparison}
            onOpenSchema={() => setIsSchemaModalOpen(true)}
          />
        )}

        {route.type === 'product' && activeProduct && (
          <ProductHubView
            product={activeProduct}
            allProducts={products}
            onNavigateHome={handleNavigateHome}
            onSelectProduct={handleSelectProduct}
            onSelectComparison={handleSelectComparison}
          />
        )}

        {route.type === 'product' && !activeProduct && (
          <div className="my-16 max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Not Found</h2>
            <p className="text-xs text-slate-500">The requested product ID does not exist in our catalog.</p>
            <button
              type="button"
              onClick={handleNavigateHome}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              Back to Catalog
            </button>
          </div>
        )}

        {route.type === 'admin' && (
          <AdminDashboard
            products={products}
            onRefreshProducts={loadProducts}
            onNavigateHome={handleNavigateHome}
            onSelectComparison={handleSelectComparison}
          />
        )}

        {route.type === 'out' && (
          <OutboundRedirectView
            slug={route.slug}
            query={route.query}
            merchant={route.merchant}
            onNavigateHome={handleNavigateHome}
          />
        )}
      </main>

      {/* Footer with Compliance & Policies */}
      <Footer
        onOpenModal={(type) => setActiveModal(type)}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
      />

      {/* Policy Modals (Privacy, Terms, Contact, About) */}
      <PolicyModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* JSON-LD Schema Modal */}
      {activeComparison && (
        <JsonLdModal
          comparison={activeComparison}
          isOpen={isSchemaModalOpen}
          onClose={() => setIsSchemaModalOpen(false)}
        />
      )}
    </div>
  );
}
