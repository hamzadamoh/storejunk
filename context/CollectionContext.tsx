"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useProducts } from "./ProductContext";

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
    { id: "gothic", title: "Gothic", description: "Dark shadows, Victorian mystery", heroImage: "" },
    { id: "floral", title: "Floral", description: "Blooms, botanicals & garden pages", heroImage: "" },
    { id: "whimsical", title: "Whimsical", description: "Playful, cottagecore & fairy tale", heroImage: "" },
    { id: "spring", title: "Spring", description: "Fresh pastels & spring blooms", heroImage: "" },
    { id: "summer", title: "Summer", description: "Sunshine, tropical & warm vibes", heroImage: "" },
    { id: "animals", title: "Animals", description: "Cats, creatures & woodland friends", heroImage: "" },
    { id: "ocean", title: "Ocean", description: "Sea, mermaid & nautical pages", heroImage: "" },
    { id: "magical", title: "Magical", description: "Celestial, moon & enchanted pages", heroImage: "" },
    { id: "vintage", title: "Vintage", description: "Aged parchment & Victorian ephemera", heroImage: "" }
];

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { getCollectionHeroImage } = useProducts();

    useEffect(() => {
        const loadCollections = async () => {
            const updatedCollections = await Promise.all(
                initialCollections.map(async (col) => {
                    const heroImage = await getCollectionHeroImage(col.id);
                    return { ...col, heroImage: heroImage || "" };
                })
            );
            setCollections(updatedCollections);
            setIsLoaded(true);
        };

        loadCollections();
    }, [getCollectionHeroImage]);

    const addCollection = async (collection: Collection) => {
        setCollections((prev) => [...prev, collection]);
        try {
            await fetch('/api/collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: collection.id,
                    title: collection.title,
                    description: collection.description,
                    hero_image: collection.heroImage
                }),
            });
        } catch (error) {
            console.error("Failed to add collection", error);
        }
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
