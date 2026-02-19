"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
    id: string;
    title: string;
    price: number;
    img: string; // Keep this as a single string for valid thumbnail display
    type: string;
};

type CartContextType = {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    toggleCart: () => void;
    cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => [...prev, item]);
        setIsCartOpen(true); // Open drawer when adding
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                addToCart,
                removeFromCart,
                toggleCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
