'use client';

import { Product } from '../data/products';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { formatCurrency } from '../utils/currency';
import ProductImage from './ProductImage';
import { useState, useCallback } from 'react';
import { validatePrice, validateQuantity, checkRateLimit } from '../utils/security';
import { validateProductData } from '../utils/validation';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      alert(rateLimitCheck.error || 'Too many requests. Please wait a moment.');
      return;
    }

    const priceCheck = validatePrice(product.price);
    if (!priceCheck.valid) {
      console.error('Invalid product price:', priceCheck.error);
      return;
    }

    const validation = validateProductData({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });

    if (!validation.valid) {
      console.error('Invalid product data:', validation.error);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });

    onClose();
  }, [addItem, product, quantity, onClose]);

  const toggleWishlist = useCallback(() => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [product, isInWishlist, addToWishlist, removeFromWishlist]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors"
            aria-label="Close quick view"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 flex items-center justify-center">
              <ProductImage image={product.image} name={product.name} className="w-64 h-64 text-slate-600" />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.brand && (
                <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">{product.brand}</p>
              )}
              <h2 className="text-3xl font-bold text-slate-900">{product.name}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Quantity:</label>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-slate-900 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium text-base transition-all duration-200 ${
                    product.inStock
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    isInWishlist(product.id)
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg className="w-6 h-6" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {!product.inStock && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">This product is currently out of stock.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}