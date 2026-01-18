import CartDrawer from './cart/components/CartDrawer.tsx';
import { useCart } from './cart/hooks/useCart.ts';
import './App.css';
import { useState } from 'react';

export default function App() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'Apple', image: 'apple.png', price: 1.50, category: 'fruits' },
    { id: 2, name: 'Banana', image: 'banana.png', price: 0.75, category: 'fruits' },
    { id: 3, name: 'Orange', image: 'orange.png', price: 1.25, category: 'fruits' },
    { id: 4, name: 'Grapes', image: 'grapes.png', price: 3.00, category: 'fruits' },
    { id: 5, name: 'Strawberries', image: 'strawberries.png', price: 4.50, category: 'fruits' },
    { id: 6, name: 'Carrot', image: 'carrot.png', price: 0.50, category: 'vegetables' },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <h1>SnappyCart Demo</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <button
            key={product.id}
            onClick={() => addItem({ ...product, quantity: 1 })}
          >
            Add {product.name} (${product.price.toFixed(2)})
          </button>
        ))}
      </div>
      <CartDrawer />
    </>
  );
}