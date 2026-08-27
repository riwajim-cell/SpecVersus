import React, { useState } from 'react';
import {
  Lock,
  Database,
  Plus,
  Edit2,
  Trash2,
  Download,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  DollarSign,
  Star,
  Sliders
} from 'lucide-react';
import { ProductItem, ProductSpecs } from '../types';
import {
  isSupabaseConfigured,
  addProduct,
  updateProduct,
  deleteProduct,
  resetToDefaultCatalog,
  exportProductsJson
} from '../lib/supabase';
import { getCanonicalSlug } from '../utils/comparator';

interface AdminDashboardProps {
  products: ProductItem[];
  onRefreshProducts: () => void;
  onNavigateHome: () => void;
  onSelectComparison: (slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onRefreshProducts,
  onNavigateHome,
  onSelectComparison,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('specversus_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState('Smartphones');
  const [formPrice, setFormPrice] = useState('999');
  const [formRating, setFormRating] = useState('4.8');
  const [formSummary, setFormSummary] = useState('');
  const [formSpecs, setFormSpecs] = useState<Array<{ key: string; val: string }>>([
    { key: 'processor', val: '' },
    { key: 'display', val: '' },
    { key: 'battery', val: '' },
    { key: 'storage', val: '' },
    { key: 'camera', val: '' },
    { key: 'weight', val: '' },
  ]);
  const [formPros, setFormPros] = useState<string[]>(['']);
  const [formCons, setFormCons] = useState<string[]>(['']);

  const isConfigured = isSupabaseConfigured();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('specversus_admin_auth', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('specversus_admin_auth');
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormId('');
    setFormName('');
    setFormBrand('');
    setFormCategory('Smartphones');
    setFormPrice('999');
    setFormRating('4.8');
    setFormSummary('');
    setFormSpecs([
      { key: 'processor', val: '' },
      { key: 'display', val: '' },
      { key: 'battery', val: '' },
      { key: 'storage', val: '' },
      { key: 'camera', val: '' },
      { key: 'weight', val: '' },
    ]);
    setFormPros(['', '']);
    setFormCons(['', '']);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingProduct(p);
    setFormId(p.id);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormRating(p.rating.toString());
    setFormSummary(p.summary || '');
    const specsArray = Object.entries(p.specs).map(([key, val]) => ({
      key,
      val: val || ''
    }));
    setFormSpecs(specsArray.length > 0 ? specsArray : [{ key: 'processor', val: '' }]);
    setFormPros(p.pros.length > 0 ? p.pros : ['']);
    setFormCons(p.cons.length > 0 ? p.cons : ['']);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formBrand.trim()) {
      showNotification('Product name and brand are required.', 'error');
      return;
    }

    const slugId = formId.trim()
      ? formId.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : formName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const specsObj: ProductSpecs = {};
    formSpecs.forEach((s) => {
      if (s.key.trim() && s.val.trim()) {
        specsObj[s.key.trim().toLowerCase()] = s.val.trim();
      }
    });

    const cleanPros = formPros.map((p) => p.trim()).filter(Boolean);
    const cleanCons = formCons.map((c) => c.trim()).filter(Boolean);

    const productPayload: ProductItem = {
      id: slugId,
      name: formName.trim(),
      brand: formBrand.trim(),
      category: formCategory.trim(),
      price: parseFloat(formPrice) || 0,
      rating: parseFloat(formRating) || 5.0,
      summary: formSummary.trim(),
      specs: specsObj,
      pros: cleanPros.length > 0 ? cleanPros : ['Industry leading features and performance'],
      cons: cleanCons.length > 0 ? cleanCons : ['Premium pricing bracket'],
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productPayload);
        showNotification(`Updated ${productPayload.name} successfully!`);
      } else {
        await addProduct(productPayload);
        showNotification(`Added ${productPayload.name} to catalog!`);
      }
      setIsModalOpen(false);
      onRefreshProducts();
    } catch (err: any) {
      showNotification(err.message || 'Failed to save product.', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteProduct(id);
        showNotification(`Deleted "${name}" from catalog.`);
        onRefreshProducts();
      } catch (err: any) {
        showNotification('Failed to delete product.', 'error');
      }
    }
  };

  const handleResetCatalog = async () => {
    if (confirm('Reset entire catalog to default 14 flagships? Any custom items will be overwritten.')) {
      await resetToDefaultCatalog();
      showNotification('Catalog restored to default datasets.');
      onRefreshProducts();
    }
  };

  const handleExportJson = () => {
    const jsonStr = exportProductsJson(products);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `specversus-products-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Catalog exported as JSON file!');
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Passcode gate view
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter authorized administrator passcode to manage persistent catalog products and comparisons.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label htmlFor="admin-passcode" className="text-xs font-semibold text-slate-700 block mb-1.5">
              Admin Passcode
            </label>
            <input
              id="admin-passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              autoFocus
            />
            {passcodeError && (
              <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Use default: <strong>password</strong></span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              id="admin-login-btn"
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>SpecVersus <code className="text-indigo-600 font-mono font-bold"></code></span>
          <button type="button" onClick={onNavigateHome} className="hover:text-slate-700 underline">
            Return to App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="space-y-8 pb-16">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 text-white'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Header & Connection Status */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Catalog & Matrix Dashboard
            </h1>

            {/* Live Connection Badge */}
            {isConfigured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase PostgreSQL Active</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Local Mock Persistence Mode</span>
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage tech products, dynamic specifications, pros & cons, and programmatic comparison pairs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Lock Out
          </button>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Products</span>
            <span className="text-2xl font-extrabold text-slate-900">{products.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Hardware Categories</span>
            <span className="text-2xl font-extrabold text-slate-900">{categories.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Permutation Matrix</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {Math.round((products.length * (products.length - 1)) / 2)} pairs
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Catalog Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Filters & Toolbar */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by model or brand..."
                className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 font-medium"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-700 font-medium cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              title="Download products.json"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={handleResetCatalog}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
              title="Reset catalog to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <th className="py-3.5 px-6">Product Model</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">MSRP</th>
                <th className="py-3.5 px-6">Rating</th>
                <th className="py-3.5 px-6">Specs Count</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    <div>
                      <span>{p.name}</span>
                      <span className="text-[11px] font-normal text-slate-400 block">{p.brand} • <code className="text-slate-500 font-mono text-[10px]">{p.id}</code></span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-6 text-amber-600 font-semibold">
                    ★ {p.rating} / 5.0
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    {Object.keys(p.specs).length} specs
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          <span className="text-slate-400">Edits persist in real-time</span>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Hardware Device'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Configure specifications, pros/cons, and pricing attributes.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (!editingProduct && !formId) {
                        setFormId(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      }
                    }}
                    placeholder="e.g. iPhone 16 Pro"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Slug ID (URL identifier) *</label>
                  <input
                    type="text"
                    required
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="e.g. iphone-16-pro"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Brand Manufacturer *</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="e.g. Apple, Samsung, Sony"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Product Category *</label>
                  <input
                    type="text"
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Smartphones, Laptops, Audio"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price (USD MSRP) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 999.00"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Editor / User Rating (1.0 - 5.0) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    required
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    placeholder="e.g. 4.8"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Executive Summary / Highlight</label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Key distinctive pitch and primary target buyer persona..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Dynamic Specs Editor */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Technical Specifications (Key-Value)
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormSpecs([...formSpecs, { key: '', val: '' }])}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Spec Field</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {formSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Spec Name (e.g. battery)"
                        value={spec.key}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[idx].key = e.target.value;
                          setFormSpecs(updated);
                        }}
                        className="w-1/3 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Spec Value (e.g. 5000 mAh with 45W fast charging)"
                        value={spec.val}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[idx].val = e.target.value;
                          setFormSpecs(updated);
                        }}
                        className="w-2/3 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setFormSpecs(formSpecs.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                {/* Pros */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 text-xs uppercase tracking-wider">Pros (Advantages)</span>
                    <button
                      type="button"
                      onClick={() => setFormPros([...formPros, ''])}
                      className="text-xs text-emerald-700 font-semibold"
                    >
                      + Add Pro
                    </button>
                  </div>
                  {formPros.map((pro, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => {
                          const updated = [...formPros];
                          updated[idx] = e.target.value;
                          setFormPros(updated);
                        }}
                        placeholder="e.g. Exceptional battery endurance"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setFormPros(formPros.filter((_, i) => i !== idx))}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-800 text-xs uppercase tracking-wider">Cons (Trade-offs)</span>
                    <button
                      type="button"
                      onClick={() => setFormCons([...formCons, ''])}
                      className="text-xs text-rose-700 font-semibold"
                    >
                      + Add Con
                    </button>
                  </div>
                  {formCons.map((con, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => {
                          const updated = [...formCons];
                          updated[idx] = e.target.value;
                          setFormCons(updated);
                        }}
                        placeholder="e.g. Heavier weight than competitors"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setFormCons(formCons.filter((_, i) => i !== idx))}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 -mx-6 -mb-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 rounded-b-3xl">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
