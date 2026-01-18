import CartDrawer from './cart/components/CartDrawer.tsx';
import { useCart } from './cart/hooks/useCart.ts';
import './App.css';

export default function App() {
  const { addItem } = useCart();

  return (
    <>
      <h1>SnappyCart Demo</h1>
      <div className="product-grid">
        <button onClick={() => addItem({ id: 1, name: 'Apple', image: 'apple.png', price: 1.50, quantity: 1 })}>
          Add Apple ($1.50)
        </button>
        <button onClick={() => addItem({ id: 2, name: 'Banana', image: 'banana.png', price: 0.75, quantity: 1 })}>
          Add Banana ($0.75)
        </button>
        <button onClick={() => addItem({ id: 3, name: 'Orange', image: 'orange.png', price: 1.25, quantity: 1 })}>
          Add Orange ($1.25)
        </button>
        <button onClick={() => addItem({ id: 4, name: 'Grapes', image: 'grapes.png', price: 3.00, quantity: 1 })}>
          Add Grapes ($3.00)
        </button>
        <button onClick={() => addItem({ id: 5, name: 'Strawberries', image: 'strawberries.png', price: 4.50, quantity: 1 })}>
          Add Strawberries ($4.50)
        </button>
        <button onClick={() => addItem({ id: 6, name: 'Carrot', image: 'carrot.png', price: 0.50, quantity: 1 })}>
          Add Carrot ($0.50)
        </button>
      </div>
      <CartDrawer />
    </>
  );
}