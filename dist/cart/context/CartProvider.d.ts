import { ReactNode } from 'react';
export interface CartItem {
    id: number;
    name: string;
    image: string;
    quantity: number;
}
export declare const CartProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useCartContext: () => {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    decreaseItem: (id: number) => void;
    clearCart: () => void;
};
