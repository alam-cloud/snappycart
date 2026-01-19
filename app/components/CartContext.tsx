'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { validatePrice, validateQuantity, sanitizeInput, checkRateLimit } from '../utils/security';
import { validateProductData } from '../utils/validation';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string | number, variant?: string) => void;
  updateQuantity: (id: string | number, quantity: number, variant?: string) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    // Rate limiting check
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      console.error('Rate limit exceeded');
      return;
    }

    // Validate product data
    const validation = validateProductData({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    });

    if (!validation.valid) {
      console.error('Invalid product data:', validation.error);
      return;
    }

    // Validate price
    const priceCheck = validatePrice(item.price);
    if (!priceCheck.valid) {
      console.error('Invalid price:', priceCheck.error);
      return;
    }

    // Validate quantity
    const quantityCheck = validateQuantity(item.quantity || 1);
    if (!quantityCheck.valid) {
      console.error('Invalid quantity:', quantityCheck.error);
      return;
    }

    // Sanitize input
    const sanitizedItem: CartItem = {
      id: item.id,
      name: sanitizeInput(item.name),
      price: item.price,
      quantity: item.quantity || 1,
      variant: item.variant ? sanitizeInput(item.variant) : undefined,
    };

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === sanitizedItem.id && (i.variant || 'default') === (sanitizedItem.variant || 'default')
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        const newQuantity = newItems[existingItemIndex].quantity + sanitizedItem.quantity;
        
        // Validate combined quantity
        const combinedQuantityCheck = validateQuantity(newQuantity);
        if (!combinedQuantityCheck.valid) {
          console.error('Quantity would exceed maximum:', combinedQuantityCheck.error);
          return prevItems;
        }

        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity,
        };
        return newItems;
      }

      return [...prevItems, sanitizedItem];
    });
  }, []);

  const removeItem = useCallback((id: string | number, variant?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && (item.variant || 'default') === (variant || 'default'))
      )
    );
  }, []);

  const updateQuantity = useCallback((id: string | number, quantity: number, variant?: string) => {
    // Rate limiting check
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      console.error('Rate limit exceeded');
      return;
    }

    if (quantity <= 0) {
      removeItem(id, variant);
      return;
    }

    // Validate quantity
    const quantityCheck = validateQuantity(quantity);
    if (!quantityCheck.valid) {
      console.error('Invalid quantity:', quantityCheck.error);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && (item.variant || 'default') === (variant || 'default')
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
