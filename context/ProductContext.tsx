"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Product = {
    id: string;
    title: string;
    price: number;
    type: string;
    images: string[]; // Changed from img: string
    collectionId: string;
    description?: string;
};

type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    getProductsByCollection: (collectionId: string) => Product[];
    getProductById: (id: string) => Product | undefined; // Added helper
};

const initialProducts: Product[] = [
    // Gothic Noir
    {
        id: "midnight-ledger",
        title: "The Midnight Ledger",
        price: 12.50,
        type: "Digital Kit",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBSSMhJwAKOLgI8LjcxOIZQa5-8WoNWLRtjgJoVZZwUoVR2zPv1XsL5FlTkdWcteWL6XuYNWa9tisbmyjvj2ljFqierAZzWfiW0NtvJOhWT1A1dKJ9Q2kj8Wy9X6UfbAStMkLAYFGQFSqBUJblnt_OvN4AMRaI5rkUNXfyVsHWQ6pp2O-y6_W5Z4fysky9aYyWdpLFDY_XffolkH0RwjVf5HiVZZibP24lqy974CHrXwunUaI24TDEEzSxtSGoZ7_SqzKZG94yqQTUi"
        ],
        collectionId: "gothic-noir",
        description: "A mysterious collection of dark ledger pages, perfect for adding a touch of financial intrigue to your gothic journals."
    },
    {
        id: "witchwood-textures",
        title: "Witchwood Textures",
        price: 9.00,
        type: "Texture Pack",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAC85fD809gP2kLa9-_c9m1sFopYK56CD8ActQqv3hB3RKPQlGLFtr55s6Q0gX0ZuvSJ3zfuuVD1M4xv-WcNvccL8ZYcHOeSg0hgWcUouHZfwft3U9HCRWWi-NueTF_gXqAbfaTg5OQU-yLAqw5__QO1PBrKalQAS-Rsqk5J54mpQrVAS_G9MwrXpgENvUrBYXZPL-jd0JgizVS68Mwt5SCvdK-K5bHPvtxiuwRO3BxLZelmGO76NKsndgQ0vvJ_0O9RvFON4nEhat0"
        ],
        collectionId: "gothic-noir",
        description: "High-contrast woods and bark textures collected from the deepest parts of the ancient forest."
    },
    // Victorian Ephemera
    {
        id: "gilded-parchment",
        title: "Gilded Parchment",
        price: 15.00,
        type: "Texture Pack",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCDV7VlOVKsPAh6jwpWSa8NyaZ0ULKuDOn-ubQcFagLwKcnkrD0ntosoVSKrsn1aGmHFYuJl-IvPvTAn1sYcYqzRyOKwAS4q79sf4fC_FdTAfrDQPF5pcZvurYTbdSQRH0Bl4zAlzrjKkudizFFyDWSI4Edzt5G6AdpWdQEmS8z4PQQG96VebhEAR7xYS7HgrwTYxwyNLcU1wY7pHpdr1_-ANerSMxhgGDghe_QZqhUIgX7boLOAMcRbO1WYuuF8k0QUOzwu6LUbc"
        ],
        collectionId: "victorian-ephemera",
        description: "Luxurious parchment backgrounds with faux gold foil edges. Ideal for elegant invitations and vintage letters."
    },
    // Botanical Grimoires
    {
        id: "botanical-grimoire",
        title: "Botanical Grimoire",
        price: 14.00,
        type: "Digital Kit",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA-6O_O1XnvGArSIO_cuyOQOQ39vJ6y55tF2A7Y6wF2t9h1j44u5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBweIzw8GCv3L1gyjwoQTeTopIEraFAy8MbkphRTqR0t3cCqfHH3uH-IaIzXLdN7FQY5bSeyaK5KWXq2Z4lJZXKxFsOSNsPiPfTqgmUByr_4ISwM_qmVrY9CKKu0ImrX-WiPhFobxJc0M4jqsaTGIoUX3yRfC3VHALWqzWTAgOwBUVvn6rtg9JNgvmDGIPSScjF5T9wTtL9F_whH9vLIeO7rwD86-tjQy5Eh96dAAl04_Y24eDcbVacMbDALt--IVjM2El6lRr7a7c5",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAs8P4m1sHko48mgbQmoKdYtPC7G_0z5tcEnD5nzour2UGRlxkVWX_p3bishleKxUPO_EH_8eO415L-Z9kx7k3KJV9G6TRRuCw50otv2o_UTCwhWkdCcowAvrzuyXcFDuXB_PEq7DBxjhbw2qRlXwtE0FiV9e70ZoOt8hbMUGVfvSQxpCXHbd6PWDNg2KLJDKRpQKEyWYi3xVARee5KGxPv8NrQsr_vPk186lNRB6d9UjpkXv-anVJVYjdUGem7hJySY3Fb0Mz9Eb7I"
        ],
        collectionId: "botanical-grimoires",
        description: "A comprehensive kit featuring herbarium pages, pressed flowers, and secret garden notes."
    },
    {
        id: "celestial-grimoire",
        title: "Celestial Grimoire Kit",
        price: 18.99,
        type: "Bundle: Pages & Ephemera",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD3TVlQ4VrIl17ygKpXxo_ned8QkGQ2kvhlNCDNtFtICEXPCEr4PGcKZIen3fn6VCWSaoco9Eb1vVH--a7rQLtQuMxn5KUkOejGejm8TstZrOF0eVf6VD9WZGwuCBwm2LpkLw0zSyMluDTSGXgIYlbI13hXjvUWRSIUrfeJ91UpeEpd8teGSJUwKYi6sZwHUjN75ldEAu12PDNSIYdQo4FL39rdQ03V3tohvxLTS-ll6tDrYbVewgUswq0nzSaMJ7lwj8v48aodv823"
        ],
        collectionId: "botanical-grimoires",
        description: "Map the stars with this celestial set. Includes star charts, moon phases, and cosmic textures."
    }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from API on mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    // Postgres returns DECIMAL as string, so we need to cast it
                    const formattedDetails = data.map((p: any) => ({
                        ...p,
                        price: Number(p.price)
                    }));
                    setProducts(formattedDetails);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsLoaded(true);
            }
        }
        fetchProducts();
    }, []);

    const addProduct = async (product: Product) => {
        // Optimistic update
        setProducts((prev) => [product, ...prev]);

        try {
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    type: product.type,
                    images: product.images,
                    collection_id: product.collectionId, // API expects snake_case
                    description: product.description
                }),
            });
        } catch (error) {
            console.error("Failed to add product", error);
            // Revert on failure? For now, just log.
        }
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        // TODO: Add API Delete endpoint if needed
    };

    const getProductsByCollection = (collectionId: string) => {
        return products.filter((p) => p.collectionId === collectionId); // Note: PG returns snake_case usually, need to check mapping
    };

    const getProductById = (id: string) => {
        return products.find(p => p.id === id);
    }

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, getProductsByCollection, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
