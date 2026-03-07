"use client";

import { useEffect, useState, Fragment } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/context/ProductContext";
import FallbackImage from "@/components/FallbackImage";
import Link from "next/link";

const COLLECTIONS = [
    { id: "gothic", title: "Gothic" },
    { id: "floral", title: "Floral" },
    { id: "whimsical", title: "Whimsical" },
    { id: "spring", title: "Spring" },
    { id: "summer", title: "Summer" },
    { id: "animals", title: "Animals" },
    { id: "ocean", title: "Ocean" },
    { id: "magical", title: "Magical" },
    { id: "vintage", title: "Vintage" }
];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});

    // Delete State
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map db rows to Product type
            const formatted = (data || []).map((p: any) => ({
                id: p.id,
                title: p.title,
                full_title: p.full_title,
                price: Number(p.price),
                type: p.type,
                images: p.images || [],
                collectionId: p.collection,
                description: p.description,
                sku: p.sku,
                tags: p.tags || []
            }));

            setProducts(formatted);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    }

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Editing Logic
    const startEdit = (product: Product) => {
        setEditingId(product.id);
        setEditForm(product);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (field: keyof Product, value: any) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const saveEdit = async () => {
        if (!editingId) return;
        try {
            const updatePayload = {
                title: editForm.title,
                full_title: editForm.full_title,
                price: editForm.price,
                type: editForm.type,
                images: editForm.images,
                collection: editForm.collectionId,
                description: editForm.description,
                sku: editForm.sku,
                tags: typeof editForm.tags === 'string' ? (editForm.tags as string).split(',').map(s => s.trim()) : editForm.tags
            };

            const { error } = await supabase
                .from('products')
                .update(updatePayload)
                .eq('id', editingId);

            if (error) throw error;

            // Update local state
            setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as Product : p));
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update product:", err);
            alert("Failed to update product.");
        }
    };

    // Delete Logic
    const confirmDelete = async () => {
        if (!deletingId) return;
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', deletingId);

            if (error) throw error;

            setProducts(prev => prev.filter(p => p.id !== deletingId));
            setDeletingId(null);
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-serif font-bold text-white">Products</h1>
                <Link href="/dashboard/products/add" className="bg-[#e6b319] text-[#0f0f0f] px-6 py-3 rounded-lg font-bold hover:bg-[#d4a017] transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    Add Product
                </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">search</span>
                <input
                    type="text"
                    placeholder="Search by title or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-stone-800 rounded-xl pl-12 pr-4 py-3 text-stone-200 focus:border-[#e6b319] focus:outline-none transition-colors"
                />
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-stone-800 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-stone-500 animate-pulse">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-stone-500 italic">No products match your search.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-stone-900/50 text-stone-400 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium w-16">Image</th>
                                    <th className="p-4 font-medium">Title & SKU</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Collection</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800 text-stone-300 text-sm">
                                {filteredProducts.map(product => (
                                    <Fragment key={product.id}>
                                        <tr className="hover:bg-stone-800/20 transition-colors group">
                                            <td className="p-4">
                                                <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-900 shrink-0">
                                                    <FallbackImage src={product.images?.[0]} title={product.title} alt={product.title} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-bold text-stone-200">{product.title}</p>
                                                <p className="text-xs text-stone-500 font-mono mt-1">{product.sku || 'No SKU'}</p>
                                            </td>
                                            <td className="p-4 font-bold text-[#e6b319]">${product.price.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 text-xs text-stone-300">
                                                    {product.collectionId || 'None'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-stone-400">{product.type || 'Digital'}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => startEdit(product)} className="p-2 text-stone-400 hover:text-[#e6b319] hover:bg-[#e6b319]/10 rounded-lg transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button onClick={() => setDeletingId(product.id)} className="p-2 text-stone-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Inline Edit Form */}
                                        {editingId === product.id && (
                                            <tr className="bg-stone-900/50">
                                                <td colSpan={6} className="p-6">
                                                    <div className="border border-stone-800 rounded-xl p-6 bg-[#0f0f0f] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-xs text-stone-500 mb-1">Title</label>
                                                                <input type="text" value={editForm.title || ''} onChange={e => handleEditChange('title', e.target.value)} className="w-full bg-[#1a1a1a] border border-stone-800 rounded p-2 text-stone-200 text-sm focus:border-[#e6b319] focus:outline-none" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-stone-500 mb-1">Price</label>
                                                                <input type="number" step="0.01" value={editForm.price || 0} onChange={e => handleEditChange('price', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-stone-800 rounded p-2 text-stone-200 text-sm focus:border-[#e6b319] focus:outline-none" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-xs text-stone-500 mb-1">Collection</label>
                                                                <select value={editForm.collectionId || ''} onChange={e => handleEditChange('collectionId', e.target.value)} className="w-full bg-[#1a1a1a] border border-stone-800 rounded p-2 text-stone-200 text-sm focus:border-[#e6b319] focus:outline-none">
                                                                    {COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-stone-500 mb-1">Description</label>
                                                                <textarea rows={3} value={editForm.description || ''} onChange={e => handleEditChange('description', e.target.value)} className="w-full bg-[#1a1a1a] border border-stone-800 rounded p-2 text-stone-200 text-sm focus:border-[#e6b319] focus:outline-none resizen-none" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4 lg:col-span-1 md:col-span-2">
                                                            <div>
                                                                <label className="block text-xs text-stone-500 mb-1">Image URLs (comma separated)</label>
                                                                <textarea rows={3} value={(editForm.images || []).join(',\n')} onChange={e => handleEditChange('images', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="w-full bg-[#1a1a1a] border border-stone-800 rounded p-2 text-stone-200 text-sm focus:border-[#e6b319] focus:outline-none resizen-none" />
                                                            </div>
                                                            <div className="flex gap-2 justify-end pt-2">
                                                                <button onClick={cancelEdit} className="px-4 py-2 text-sm text-stone-400 hover:text-stone-200 transition-colors">Cancel</button>
                                                                <button onClick={saveEdit} className="px-4 py-2 text-sm bg-green-900/50 text-green-400 border border-green-800 hover:bg-green-800 rounded-lg transition-colors font-bold">Save Changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            {deletingId && (
                <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#1a1a1a] border border-stone-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Delete Product?</h2>
                        <p className="text-stone-400 mb-6">This action cannot be undone. This product will be permanently removed.</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setDeletingId(null)} className="px-4 py-2 font-medium text-stone-400 hover:text-stone-200 transition-colors rounded-lg">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 font-bold bg-red-900 border border-red-800 text-red-100 hover:bg-red-800 transition-colors rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
