'use client';

import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import { useState, useMemo, useEffect } from 'react';
import { products, categories, Product } from './data/products';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CategoryIcon from './components/CategoryIcon';
import QuickView from './components/QuickView';

// Main Home Component
export default function Home() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">SnappyCart</h1>
                  <p className="text-xs text-slate-500 font-medium">Professional E-Commerce</p>
                </div>
              </div>
              <CartDrawer />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductCatalog />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Newsletter Subscription */}
            <div className="mb-12 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Stay Updated</h3>
              <p className="text-slate-600 mb-6">Subscribe to our newsletter for the latest products and exclusive offers</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email');
                  alert(`Thank you for subscribing! We'll send updates to ${email}`);
                  e.currentTarget.reset();
                }}
                className="max-w-md mx-auto flex gap-2"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Copyright */}
            <div className="text-center text-slate-600 border-t border-slate-200 pt-8">
              <p className="text-sm font-medium">© 2025 SnappyCart. All rights reserved.</p>
              <p className="text-xs text-slate-500 mt-2">Built with Next.js & TypeScript</p>
            </div>
          </div>
        </footer>
      </div>
      </WishlistProvider>
    </CartProvider>
  );
}

// Product Catalog Component with Search and Filters
function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(uniqueBrands).sort();
  }, []);

  // Track recently viewed products
  useEffect(() => {
    try {
      const stored = localStorage.getItem('snappycart-recently-viewed');
      if (stored) {
        const parsed = JSON.parse(stored);
        const viewedProducts = parsed
          .map((id: string) => products.find((p) => p.id === id))
          .filter(Boolean) as Product[];
        setRecentlyViewed(viewedProducts.slice(0, 4));
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    // Track as recently viewed
    try {
      const stored = localStorage.getItem('snappycart-recently-viewed') || '[]';
      const parsed = JSON.parse(stored) as string[];
      const updated = [product.id, ...parsed.filter((id) => id !== product.id)].slice(0, 10);
      localStorage.setItem('snappycart-recently-viewed', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recently viewed:', error);
    }
  };

  // Filter products based on category, search, price, and brand
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => product.brand && selectedBrands.includes(product.brand));
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange, selectedBrands]);

  // Get related products (same category, exclude current)
  const getRelatedProducts = (product: Product, excludeId: string, limit: number = 4) => {
    return products
      .filter((p) => p.category === product.category && p.id !== excludeId)
      .slice(0, limit);
  };

  return (
    <div>
      {/* Search and Filters Section */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 placeholder-slate-400 bg-white"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2.5 text-sm ${
                selectedCategory === category.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <CategoryIcon icon={category.icon} className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Price Range */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Price:</label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-32"
              />
              <span className="text-sm text-slate-600 min-w-[4rem]">£0 - £{priceRange[1]}</span>
            </div>

            {/* Brand Filter */}
            {brands.length > 0 && (
              <select
                value={selectedBrands[0] || ''}
                onChange={(e) => setSelectedBrands(e.target.value ? [e.target.value] : [])}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Sort and View Toggle */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-slate-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
                  <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                  </button>
            </div>
            </div>
          </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 font-medium">
            Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{products.length}</span> products
          </p>
          {(searchQuery || selectedBrands.length > 0 || priceRange[1] < 500) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrands([]);
                setPriceRange([0, 500]);
                setSelectedCategory('all');
              }}
              className="text-sm text-slate-700 hover:text-slate-900 font-medium underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={handleQuickView} viewMode="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-slate-700 hover:text-slate-900 font-medium underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      </div>
  );
}
