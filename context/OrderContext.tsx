"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Order = {
    id: string;
    email: string;
    items: { id: string; title: string; price: number; type: string }[];
    total: number;
    payment_method: string;
    status: string;
    is_test: boolean;
    created_at: string;
};

type OrderContextType = {
    orders: Order[];
    addOrder: (order: Omit<Order, "created_at" | "status">) => Promise<void>;
    refreshOrders: () => Promise<void>;
    isLoading: boolean;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/orders");
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setOrders(data);
                }
            }
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshOrders();
    }, [refreshOrders]);

    const addOrder = async (order: Omit<Order, "created_at" | "status">) => {
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.details || "Failed to save order");
            }

            // Refresh orders list
            await refreshOrders();
        } catch (error) {
            console.error("Failed to save order:", error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, refreshOrders, isLoading }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
}
