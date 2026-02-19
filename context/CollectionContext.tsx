"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Collection = {
    id: string; // "gothic-noir"
    title: string;
    description: string;
    heroImage: string;
};

type CollectionContextType = {
    collections: Collection[];
    addCollection: (collection: Collection) => void;
    deleteCollection: (id: string) => void;
    getCollectionById: (id: string) => Collection | undefined;
};

const initialCollections: Collection[] = [
    {
        id: "gothic-noir",
        title: "Gothic Noir",
        description: "Deep shadows, velvet textures, and the elegance of the dark academia aesthetic.",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhkpEyBUsuL0v4i0q-_bsdQHvtK85z2OHdy4JhQATRUtQCCzLh2Mz385d9O4EznGPS_k4xV_3xWtRPUBokEYRuBQQBXcj5d8yOva8K3NjPUkZy6WTHCPnrG5Q4Fywyw_ztmXaXm56sKvYpefF4qe1JceCb4Xi2j7S9nhJuK-DPeFfQUt3FcYmjRcFst7MQtPvYmDINsnLneMfk8sW4P8yTUJ4mfHkyigbZcCaCt3KcRS9RKZgXV1rtnVqU0Cf21ALKDDCMxWdW2QMF",
    },
    {
        id: "victorian-ephemera",
        title: "Victorian Ephemera",
        description: "Delicate lace, faded letters, and the romance of a bygone era.",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEeciNi-E9j6cBXIcX5t_vSYYqaUx4xOS6h6cDpT72hL5WPOHu-e9KdiN8mPEPSP9-rJFpEouBareTwFAHBm27U9v7H_kzyDhR0t4f6CQ2h-cWG-mhVC5akscMWvXIAa-7SByxFK3AJWX4KwSXl7gVuzr_6CS6ZDKNiioPOK-40OqSSLQU7V-QLNj4NHFseTwxjvCYdNOTM8tjMNCHE00GBOlXWNFAmqrVM5LwNDr78briLlem-3rWHNaQvS4CfSETaqmHDLi7AHFG",
    },
    {
        id: "botanical-grimoires",
        title: "Botanical Grimoires",
        description: "Herbal sketches, pressed flowers, and the secrets of the garden witch.",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt",
    }
];

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
    const [collections, setCollections] = useState<Collection[]>(initialCollections);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("tinysteps_collections");
        if (saved) {
            try {
                setCollections(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse collections", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("tinysteps_collections", JSON.stringify(collections));
        }
    }, [collections, isLoaded]);

    const addCollection = (collection: Collection) => {
        setCollections((prev) => [...prev, collection]);
    };

    const deleteCollection = (id: string) => {
        setCollections((prev) => prev.filter((c) => c.id !== id));
    };

    const getCollectionById = (id: string) => {
        return collections.find(c => c.id === id);
    }

    return (
        <CollectionContext.Provider value={{ collections, addCollection, deleteCollection, getCollectionById }}>
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollections() {
    const context = useContext(CollectionContext);
    if (context === undefined) {
        throw new Error("useCollections must be used within a CollectionProvider");
    }
    return context;
}
