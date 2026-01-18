import CartDrawer from './cart/components/CartDrawer.tsx';
import { useCart } from './cart/hooks/useCart.ts';
import './App.css';
import { useState } from 'react';

export default function App() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Apple', image: 'apple.png', price: 1.50 },
    { id: 2, name: 'Banana', image: 'banana.png', price: 0.75 },
    { id: 3, name: 'Orange', image: 'orange.png', price: 1.25 },
    { id: 4, name: 'Grapes', image: 'grapes.png', price: 3.00 },
    { id: 5, name: 'Strawberries', image: 'strawberries.png', price: 4.50 },
    { id: 6, name: 'Carrot', image: 'carrot.png', price: 0.50 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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