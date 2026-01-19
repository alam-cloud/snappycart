'use client';

import { Product } from '../data/products';
import { useCart } from './CartContext';
import { formatCurrency } from '../utils/currency';
import ProductImage from './ProductImage';
import { useCallback } from 'react';
import { validatePrice, validateQuantity, checkRateLimit } from '../utils/security';
import { validateProductData } from '../utils/validation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200">
      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10 shadow-sm">
            SAVE {discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-10">
            <span className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium text-sm">Out of Stock</span>
          </div>
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

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700 ml-1">{product.rating}</span>
            </div>
            {product.reviewCount && (
              <span className="text-xs text-slate-500">({product.reviewCount.toLocaleString()})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
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
