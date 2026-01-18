import CartDrawer from './cart/components/CartDrawer.tsx';
import { useCart } from './cart/hooks/useCart.ts';

export default function App() {
  const { addItem } = useCart();

  return (
    <>
      <h1>SnappyCart Demo</h1>
      <button onClick={() => addItem({ id: 1, name: 'Apple', image: 'apple.png', price: 1.50, quantity: 1 })}>
        Add Apple ($1.50)
      </button>
      <button onClick={() => addItem({ id: 2, name: 'Banana', image: 'banana.png', price: 0.75, quantity: 1 })}>
        Add Banana ($0.75)
      </button>
      <CartDrawer />
    </>
  );
}