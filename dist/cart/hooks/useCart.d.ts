export declare const useCart: () => {
    cart: import('../..').CartItem[];
    addItem: (item: import('../..').CartItem) => void;
    removeItem: (id: number) => void;
    decreaseItem: (id: number) => void;
    clearCart: () => void;
};
