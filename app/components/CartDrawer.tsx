'use client';

import { useCart } from './CartContext';
import { useState, useCallback } from 'react';
import { products } from '../data/products';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import { formatCurrency } from '../utils/currency';
import ProductImage from './ProductImage';
import { sanitizeInput } from '../utils/security';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');


  const cartItemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = total || 0;

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-slate-900 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-slate-800 transition-all duration-200 flex items-center gap-2 font-medium hover:shadow-md"
        aria-label="Open cart"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="hidden sm:inline">Cart</span>
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-semibold min-w-[20px] text-center">
            {sanitizeInput(cartItemCount)}
          </span>
        )}
      </button>

      {/* Cart Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Shopping Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-slate-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-slate-700 text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-slate-500 text-sm">Start adding items to your cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.id);
                if (!product) return null;

                const itemTotal = product.price * (item.quantity || 0);

                return (
                  <div
                    key={`${item.id}-${item.variant || 'default'}`}
                    className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow bg-white"
                  >
                    <div className="bg-slate-50 p-3 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                      <ProductImage image={product.image} name={product.name} className="w-10 h-10 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 text-sm">
                        {sanitizeInput(product.name)}
                      </h3>
                      {product.brand && (
                        <p className="text-xs text-slate-500 mb-1 font-medium">{product.brand}</p>
                      )}
                      <p className="text-sm font-medium text-slate-600 mb-3">
                        {formatCurrency(product.price)} each
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border border-slate-300 rounded-md">
                          <button
                            onClick={() => {
                              const newQty = Math.max(0, (item.quantity || 0) - 1);
                              if (newQty === 0) {
                                removeItem(item.id, item.variant);
                              } else {
                                updateQuantity(item.id, newQty, item.variant);
                              }
                            }}
                            className="px-3 py-1.5 hover:bg-slate-100 rounded-l-md transition-colors text-slate-700 font-medium text-sm"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 py-1.5 text-sm font-semibold text-slate-900 min-w-[2rem] text-center">
                            {sanitizeInput(item.quantity || 0)}
                          </span>
                          <button
                            onClick={() => {
                              updateQuantity(item.id, (item.quantity || 0) + 1, item.variant);
                            }}
                            className="px-3 py-1.5 hover:bg-slate-100 rounded-r-md transition-colors text-slate-700 font-medium text-sm"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-red-600 hover:text-red-700 text-xs font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-base">{formatCurrency(itemTotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6 bg-slate-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-900">Subtotal:</span>
              <span className="font-bold text-slate-900 text-2xl">{formatCurrency(cartTotal)}</span>
            </div>
            <p className="text-xs text-slate-600">Taxes and shipping calculated at checkout</p>
            <button
              className="w-full bg-slate-900 text-white py-3 rounded-md font-semibold hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md text-sm"
              onClick={() => {
                setIsOpen(false);
                setShowCheckout(true);
              }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-slate-700 hover:text-slate-900 py-2 font-medium transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            setOrderNumber(`ORD-${Date.now()}`);
            setShowConfirmation(true);
          }}
        />
      )}

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <OrderConfirmation
          orderNumber={orderNumber}
          onClose={() => {
            setShowConfirmation(false);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}
