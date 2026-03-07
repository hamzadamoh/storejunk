"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

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

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [fullTitle, setFullTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [collectionId, setCollectionId] = useState("gothic");
    const [type, setType] = useState("Digital Kit");
    const [sku, setSku] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState(["", "", "", "", ""]);

    // CSV State
    const [csvMessage, setCsvMessage] = useState("");
    const [csvError, setCsvError] = useState("");
    const [csvLoading, setCsvLoading] = useState(false);

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const finalImages = images.filter(img => img.trim() !== "");
            const payload = {
                title,
                full_title: fullTitle || null,
                price: Number(price),
                description,
                collection: collectionId,
                type,
                sku: sku || null,
                tags: tags.split(",").map(t => t.trim()).filter(Boolean),
                images: finalImages
            };

            const { error } = await supabase.from('products').insert([payload]);
            if (error) throw error;

            router.push("/dashboard/products");
        } catch (err) {
            console.error("Failed to add product:", err);
            alert("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCsvLoading(true);
        setCsvMessage("");
        setCsvError("");

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const rows = results.data as any[];
                try {
                    const formattedRows = rows.map(row => ({
                        title: row.title || row.Title || "Untitled Product",
                        full_title: row.full_title || row.fullTitle || null,
                        price: Number(row.price || row.Price || 0),
                        description: row.description || row.Description || "",
                        collection: row.collection || row.Collection || "gothic",
                        type: row.type || row.Type || "Digital Kit",
                        sku: row.sku || row.SKU || null,
                        tags: (row.tags || row.Tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
                        images: (row.images || row.Images || "").split(",").map((img: string) => img.trim()).filter(Boolean)
                    }));

                    const { error } = await supabase.from('products').insert(formattedRows);
                    if (error) throw error;

                    setCsvMessage(`Successfully imported ${formattedRows.length} products!`);
                    e.target.value = ''; // Reset input
                } catch (error: any) {
                    console.error("CSV Import Error:", error);
                    setCsvError(`Import failed: ${error.message || "Unknown error"}`);
                } finally {
                    setCsvLoading(false);
                }
            },
            error: (err) => {
                setCsvError(`Parse error: ${err.message}`);
                setCsvLoading(false);
            }
        });
    };

    return (
        <div className="space-y-12 max-w-4xl">
            <div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Add New Product</h1>
                <p className="text-stone-400">Create a product manually or upload a CSV file for multiple products.</p>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleAddProduct} className="bg-[#1a1a1a] rounded-2xl border border-stone-800 p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-stone-300">Title <span className="text-red-500">*</span></label>
                        <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]" placeholder="Vintage Botanicals Kit" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-stone-300">Full Title</label>
                        <input type="text" value={fullTitle} onChange={(e) => setFullTitle(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]" placeholder="Vintage Botanicals Printable Junk Journal Kit..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-stone-300">Price ($) <span className="text-red-500">*</span></label>
                        <input required type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]" placeholder="4.99" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-stone-300">Collection <span className="text-red-500">*</span></label>
                        <select required value={collectionId} onChange={(e) => setCollectionId(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]">
                            {COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-stone-300">Type <span className="text-red-500">*</span></label>
                        <input required type="text" value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-stone-300">SKU</label>
                        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]" placeholder="VB-001" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-stone-300">Description</label>
                    <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319] resize-y" placeholder="Beautiful set of vintage botanicals..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-stone-300">Tags (comma separated)</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]" placeholder="flowers, vintage, journal, printable" />
                </div>

                <div className="space-y-4">
                    <label className="block text-sm text-stone-300">Images (up to 5 URLs)</label>
                    {images.map((img, i) => (
                        <input
                            key={i}
                            type="url"
                            value={img}
                            onChange={(e) => handleImageChange(i, e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319]"
                            placeholder={`Image URL ${i + 1}`}
                        />
                    ))}
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={loading} className="px-8 py-4 bg-[#e6b319] text-[#0f0f0f] font-bold rounded-xl hover:bg-[#d4a017] transition-colors disabled:opacity-50">
                        {loading ? "Saving Product..." : "Save Product"}
                    </button>
                </div>
            </form>

            <div className="w-full h-px bg-stone-800 my-12 relative">
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#0f0f0f] px-4 text-stone-400 font-medium">OR CSV COMMA IMPORT</span>
            </div>

            {/* CSV Import */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-stone-800 p-8">
                <h2 className="text-xl font-serif font-bold text-white mb-2">Bulk Import Products</h2>
                <p className="text-stone-400 mb-6 text-sm">Upload a CSV file containing columns like: title, price, collection, type, sku, description, images (comma-separated inside quotes), tags (comma-separated).</p>

                <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-stone-800 border-dashed rounded-xl cursor-pointer bg-[#0f0f0f] hover:bg-[#151515] hover:border-[#e6b319] transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-4xl text-stone-500 group-hover:text-[#e6b319] transition-colors mb-2">cloud_upload</span>
                        <p className="text-sm text-stone-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-stone-500">.csv files only</p>
                    </div>
                    <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} disabled={csvLoading} />
                </label>

                {csvLoading && <div className="mt-4 p-4 text-center text-[#e6b319] animate-pulse font-medium">Processing CSV and importing to Supabase...</div>}
                {csvMessage && <div className="mt-4 p-4 border border-green-800 bg-green-900/20 text-green-400 rounded-lg font-medium text-center">{csvMessage}</div>}
                {csvError && <div className="mt-4 p-4 border border-red-800 bg-red-900/20 text-red-400 rounded-lg font-medium text-center">{csvError}</div>}
            </div>
        </div>
    );
}
