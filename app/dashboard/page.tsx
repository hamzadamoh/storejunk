"use client";

import { useState } from "react";
import { useProducts, Product } from "@/context/ProductContext";
import { useCollections, Collection } from "@/context/CollectionContext";
import Link from "next/link";

export default function DashboardPage() {
    const { products, addProduct, deleteProduct } = useProducts();
    const { collections, addCollection, deleteCollection } = useCollections();

    const [activeTab, setActiveTab] = useState<"products" | "categories">("products");

    // Product Form State
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        type: "Digital Kit",
        collectionId: "", // Will default to first collection
        description: "",
        images: [] as string[], // Array of Base64 strings
        fileUrl: ""
    });

    // Category Form State
    const [newCollection, setNewCollection] = useState({
        title: "",
        id: "",
        description: "",
        heroImage: "" // Base64
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "product" | "collection" | "product_file") => {
        const files = e.target.files;
        if (!files) return;

        // Upload each file
        for (const file of Array.from(files)) {
            try {
                // Determine destination
                const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                    method: 'POST',
                    body: file,
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Upload failed");
                }
                const blob = await res.json();

                if (type === "product") {
                    setNewProduct(prev => ({ ...prev, images: [...prev.images, blob.url] }));
                } else if (type === "product_file") {
                    setNewProduct(prev => ({ ...prev, fileUrl: blob.url }));
                } else {
                    setNewCollection(prev => ({ ...prev, heroImage: blob.url }));
                }
            } catch (err) {
                console.error(err);
                alert(`Failed to upload ${file.name}: ${(err as Error).message}`);
            }
        }
    };

    const moveImage = (index: number, direction: 'left' | 'right') => {
        setNewProduct(prev => {
            const newImages = [...prev.images];
            const targetIndex = direction === 'left' ? index - 1 : index + 1;

            if (targetIndex >= 0 && targetIndex < newImages.length) {
                [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
            }
            return { ...prev, images: newImages };
        });
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.price || newProduct.images.length === 0) {
            alert("Please fill in all fields and upload at least one image.");
            return;
        }

        const product: Product = {
            id: Date.now().toString(),
            title: newProduct.title,
            price: Number(newProduct.price),
            type: newProduct.type || "Digital Kit",
            images: newProduct.images, // Use the base64 array
            collectionId: newProduct.collectionId || collections[0]?.id || "gothic-noir",
            description: newProduct.description,
            fileUrl: newProduct.fileUrl
        };

        try {
            await addProduct(product);
            setNewProduct({
                collectionId: "",
                type: "Digital Kit",
                title: "",
                price: "",
                images: [],
                description: "",
                fileUrl: ""
            });
            alert("Product added successfully!");
        } catch (error) {
            alert("Failed to add product. Please check your connection or database.");
        }
    };

    const handleCollectionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Auto-generate ID from title if not provided (simple slugify)
        const id = newCollection.id || newCollection.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        if (!newCollection.title || !newCollection.heroImage) {
            alert("Please provide a title and hero image.");
            return;
        }

        const collection: Collection = {
            id: id,
            title: newCollection.title,
            description: newCollection.description,
            heroImage: newCollection.heroImage
        };

        addCollection(collection);
        setNewCollection({ title: "", id: "", description: "", heroImage: "" });
        alert("Category created successfully!");
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-charcoal text-white p-6 flex flex-col gap-8">
                <div>
                    <h1 className="text-xl font-black italic tracking-widest text-primary mb-1">TINYSTEPS</h1>
                    <p className="text-xs text-stone-400 uppercase tracking-[0.2em]">Admin Dashboard</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/" className="block p-3 rounded-lg hover:bg-white/10 text-sm font-bold uppercase tracking-widest">
                        <span className="material-symbols-outlined mr-2 align-middle">home</span>
                        View Site
                    </Link>
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`w-full text-left block p-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "products" ? "bg-primary/20 text-primary" : "hover:bg-white/10 text-stone-300"}`}
                    >
                        <span className="material-symbols-outlined mr-2 align-middle">inventory_2</span>
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab("categories")}
                        className={`w-full text-left block p-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "categories" ? "bg-primary/20 text-primary" : "hover:bg-white/10 text-stone-300"}`}
                    >
                        <span className="material-symbols-outlined mr-2 align-middle">category</span>
                        Categories
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <h2 className="text-3xl font-black italic text-charcoal dark:text-white mb-8">
                    {activeTab === "products" ? "Product Management" : "Category Management"}
                </h2>

                {activeTab === "products" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Add Product Form */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-xl border border-border-gold/20">
                                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined">add_circle</span>
                                    Add New Product
                                </h3>
                                <form onSubmit={handleProductSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white"
                                            placeholder="e.g. Victorian Lace Kit"
                                            value={newProduct.title}
                                            onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Price ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white"
                                                placeholder="12.00"
                                                value={newProduct.price}
                                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Category</label>
                                            <select
                                                className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white capitalize"
                                                value={newProduct.collectionId}
                                                onChange={e => setNewProduct({ ...newProduct, collectionId: e.target.value })}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {collections.map(c => (
                                                    <option key={c.id} value={c.id}>{c.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Images (Upload Files)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-charcoal hover:file:bg-primary/80"
                                            onChange={(e) => handleImageUpload(e, "product")}
                                        />
                                        {newProduct.images.length > 0 && (
                                            <div className="flex gap-2 mt-2 overflow-x-auto p-2">
                                                {newProduct.images.map((img, i) => (
                                                    <div key={i} className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden group border border-stone-200 dark:border-stone-700">
                                                        <img src={img} alt="preview" className="w-full h-full object-cover" />

                                                        {/* Delete Button */}
                                                        <button
                                                            type="button"
                                                            onClick={() => setNewProduct(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                            title="Remove"
                                                        >
                                                            <span className="material-symbols-outlined text-[10px] block">close</span>
                                                        </button>

                                                        {/* Reorder Buttons */}
                                                        <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                type="button"
                                                                onClick={() => moveImage(i, 'left')}
                                                                disabled={i === 0}
                                                                className="text-white hover:text-primary disabled:opacity-30 disabled:hover:text-white"
                                                                title="Move Left"
                                                            >
                                                                <span className="material-symbols-outlined text-sm block">chevron_left</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => moveImage(i, 'right')}
                                                                disabled={i === newProduct.images.length - 1}
                                                                className="text-white hover:text-primary disabled:opacity-30 disabled:hover:text-white"
                                                                title="Move Right"
                                                            >
                                                                <span className="material-symbols-outlined text-sm block">chevron_right</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Digital Product File (PDF/ZIP)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.zip,.rar"
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-charcoal hover:file:bg-primary/80"
                                            onChange={(e) => handleImageUpload(e, "product_file")}
                                        />
                                        {newProduct.fileUrl && (
                                            <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                                File uploaded: {newProduct.fileUrl.split('/').pop()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Description</label>
                                        <textarea
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white min-h-[100px]"
                                            placeholder="Describe the kit..."
                                            value={newProduct.description}
                                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-primary text-charcoal font-black uppercase tracking-widest rounded-lg hover:brightness-110 transition-all">
                                        Create Product
                                    </button>
                                </form>
                            </div>
                        </div >

                        {/* Existing Products List */}
                        < div className="space-y-6" >
                            <h3 className="text-xl font-bold dark:text-white mb-4">Inventory ({products.length})</h3>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {products.map(product => (
                                    <div key={product.id} className="flex gap-4 bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700/50">
                                        <div className="size-16 shrink-0 bg-stone-900 rounded-lg overflow-hidden">
                                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold dark:text-white truncate">{product.title}</h4>
                                            <p className="text-xs text-primary font-bold">${product.price.toFixed(2)}</p>
                                            <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">{product.collectionId}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="self-start text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                                            title="Delete Product"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div >
                    </div >
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Add Category Form */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-xl border border-border-gold/20">
                                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined">category</span>
                                    Create New Category
                                </h3>
                                <form onSubmit={handleCollectionSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white"
                                            placeholder="e.g. Steampunk Industrial"
                                            value={newCollection.title}
                                            onChange={e => setNewCollection({ ...newCollection, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Slug/ID (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white"
                                            placeholder="steampunk-industrial"
                                            value={newCollection.id}
                                            onChange={e => setNewCollection({ ...newCollection, id: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Description</label>
                                        <textarea
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white min-h-[100px]"
                                            placeholder="Detailed description of the aesthetic..."
                                            value={newCollection.description}
                                            onChange={e => setNewCollection({ ...newCollection, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Hero Image (Upload)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full bg-stone-100 dark:bg-stone-900 border-none rounded-lg p-3 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-charcoal hover:file:bg-primary/80"
                                            onChange={(e) => handleImageUpload(e, "collection")}
                                        />
                                        {newCollection.heroImage && (
                                            <div className="mt-2 h-32 w-full rounded-md overflow-hidden">
                                                <img src={newCollection.heroImage} alt="hero preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-primary text-charcoal font-black uppercase tracking-widest rounded-lg hover:brightness-110 transition-all">
                                        Create Category
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Existing Categories List */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold dark:text-white mb-4">Categories ({collections.length})</h3>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {collections.map(col => (
                                    <div key={col.id} className="bg-white dark:bg-stone-800 p-0 rounded-xl border border-stone-200 dark:border-stone-700/50 overflow-hidden relative group">
                                        <div className="h-24 w-full">
                                            <img src={col.heroImage} alt={col.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center px-6">
                                                <div>
                                                    <h4 className="font-bold text-white text-xl italic">{col.title}</h4>
                                                    <p className="text-[10px] text-primary uppercase tracking-widest">/{col.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteCollection(col.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete Category"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
                }
            </main >
        </div >
    );
}
