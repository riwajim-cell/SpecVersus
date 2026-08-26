import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ComparisonView } from './components/ComparisonView';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { JsonLdModal } from './components/JsonLdModal';
import { ModalType, Comparison } from './types';
import { comparisons, getComparisonBySlug } from './data/comparisons';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // Synchronize with URL hash for true pSEO URL structures & browser back/forward history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('compare/')) {
        const slug = hash.replace('compare/', '');
        setCurrentSlug(slug);
      } else if (hash.startsWith('category/')) {
        const cat = decodeURIComponent(hash.replace('category/', ''));
        setSelectedCategory(cat);
        setCurrentSlug(null);
      } else {
        setCurrentSlug(null);
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectComparison = (slug: string) => {
    setCurrentSlug(slug);
    window.location.hash = `compare/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentSlug(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (currentSlug) {
      setCurrentSlug(null);
      window.location.hash = category === 'All' ? '' : `category/${encodeURIComponent(category)}`;
    }
  };

  const currentComparison: Comparison | undefined = currentSlug
    ? getComparisonBySlug(currentSlug)
    : undefined;

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Global Header */}
      <Header
        onNavigateHome={handleNavigateHome}
        onSelectComparison={handleSelectComparison}
        onOpenSchema={() => setIsSchemaModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentSlug={currentSlug}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentComparison ? (
          <ComparisonView
            comparison={currentComparison}
            onNavigateHome={handleNavigateHome}
            onSelectCategory={handleSelectCategory}
            onSelectComparison={handleSelectComparison}
            onOpenSchema={() => setIsSchemaModalOpen(true)}
          />
        ) : (
          <HomeView
            comparisons={comparisons}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onSelectComparison={handleSelectComparison}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
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
      {currentComparison && (
        <JsonLdModal
          comparison={currentComparison}
          isOpen={isSchemaModalOpen}
          onClose={() => setIsSchemaModalOpen(false)}
        />
      )}
    </div>
  );
}
