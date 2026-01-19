'use client';

import { Product } from '../data/products';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { formatCurrency } from '../utils/currency';
import ProductImage from './ProductImage';
import { useCallback } from 'react';
import { validatePrice, validateQuantity, checkRateLimit } from '../utils/security';
import { validateProductData } from '../utils/validation';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, onQuickView, viewMode = 'grid' }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = useCallback(() => {
    // Rate limiting check
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      alert(rateLimitCheck.error || 'Too many requests. Please wait a moment.');
      return;
    }

    // Validate product price before adding
    const priceCheck = validatePrice(product.price);
    if (!priceCheck.valid) {
      console.error('Invalid product price:', priceCheck.error);
      return;
    }

    // Validate product data
    const validation = validateProductData({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    if (!validation.valid) {
      console.error('Invalid product data:', validation.error);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }, [addItem, product]);

  const toggleWishlist = useCallback(() => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [product, isInWishlist, addToWishlist, removeFromWishlist]);

  const handleQuickView = useCallback(() => {
    if (onQuickView) {
      onQuickView(product);
    }
  }, [onQuickView, product]);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200">
        <div className="flex gap-6 p-6">
          {/* Product Image */}
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden flex-shrink-0 w-48 h-48">
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-10">
                <span className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium text-sm">Out of Stock</span>
              </div>
            )}
            <div className="h-full flex items-center justify-center">
              <ProductImage image={product.image} name={product.name} className="w-32 h-32 text-slate-600" />
            </div>
            <button
              onClick={toggleWishlist}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                isInWishlist(product.id)
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {product.brand && (
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">{product.brand}</p>
              )}
              <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{product.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                  product.inStock
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              {onQuickView && (
                <button
                  onClick={handleQuickView}
                  className="px-4 py-2.5 border border-slate-300 rounded-md font-medium text-sm text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Quick View
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200">
      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-10">
            <span className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium text-sm">Out of Stock</span>
          </div>
        )}
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all z-20 ${
            isInWishlist(product.id)
              ? 'bg-red-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
          }`}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="absolute top-2 left-2 p-2 bg-white rounded-full text-slate-600 hover:bg-slate-50 shadow-sm transition-all opacity-0 group-hover:opacity-100 z-20"
            aria-label="Quick view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        )}
        <div className="h-48 flex items-center justify-center">
          <ProductImage image={product.image} name={product.name} className="w-32 h-32 text-slate-600" />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {product.brand && (
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">{product.brand}</p>
        )}
        <h3 className="font-semibold text-base text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

        {/* Price */}
        <div className="mb-5">
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
            product.inStock
              ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
