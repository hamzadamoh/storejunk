"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Review {
    id: string;
    product_id: string;
    customer_name: string;
    customer_email: string;
    rating: number;
    comment: string;
    approved: boolean;
    verified_purchase: boolean;
    created_at: string;
    product_title?: string;
}

export default function ReviewManagement() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

    useEffect(() => {
        fetchReviews();
    }, [filter]);

    async function fetchReviews() {
        setLoading(true);
        try {
            let query = supabase
                .from('reviews')
                .select('*, products(title)')
                .order('created_at', { ascending: false });

            if (filter === "pending") {
                query = query.eq('approved', false);
            } else if (filter === "approved") {
                query = query.eq('approved', true);
            }

            const { data, error } = await query;

            if (error) throw error;

            const formatted = (data || []).map((r: any) => ({
                ...r,
                product_title: r.products?.title || "Unknown Product"
            }));

            setReviews(formatted);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        } finally {
            setLoading(false);
        }
    }

    async function toggleApproval(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('reviews')
                .update({ approved: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setReviews(reviews.map(r => r.id === id ? { ...r, approved: !currentStatus } : r));
        } catch (err) {
            console.error("Error updating review:", err);
        }
    }

    async function deleteReview(id: string) {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setReviews(reviews.filter(r => r.id !== id));
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-serif font-bold text-white">Review Archives</h1>
                <div className="flex bg-[#1a1a1a] p-1 rounded-xl border border-stone-800">
                    {(["all", "pending", "approved"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? "bg-primary text-charcoal" : "text-stone-500 hover:text-stone-300"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse text-stone-500">
                    Consulting the chronicles...
                </div>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-[#1a1a1a] border border-stone-800 rounded-2xl p-6 hover:border-primary/20 transition-all group">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-serif font-bold italic text-white">{review.customer_name}</h3>
                                            <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">{review.customer_email}</p>
                                        </div>
                                        <div className="flex text-primary gap-0.5">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-stone-900/50 p-4 rounded-xl border border-stone-800/50">
                                        <p className="text-stone-400 font-serif italic leading-relaxed">"{review.comment}"</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                                        <div className="flex items-center gap-2 text-stone-500">
                                            <span className="material-symbols-outlined text-sm text-primary">inventory_2</span>
                                            {review.product_title}
                                        </div>
                                        <div className="text-stone-600">|</div>
                                        <div className="text-stone-500">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </div>
                                        {review.verified_purchase && (
                                            <div className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[10px]">verified</span>
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-3 shrink-0">
                                    <button
                                        onClick={() => toggleApproval(review.id, review.approved)}
                                        className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-serif font-bold italic text-sm transition-all border ${review.approved ? "bg-stone-800 border-stone-700 text-stone-400 hover:text-white" : "bg-[#4a1c1c] border-primary/30 text-primary hover:bg-[#5d2323]"}`}
                                    >
                                        {review.approved ? "Archive (Hide)" : "Approve Word"}
                                    </button>
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="px-6 py-3 rounded-xl font-serif font-bold italic text-sm border border-red-900/30 text-red-500 hover:bg-red-500/10 transition-all"
                                    >
                                        Delete Forever
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border-2 border-dashed border-stone-800 rounded-3xl">
                    <span className="material-symbols-outlined text-stone-700 text-6xl mb-4">rate_review</span>
                    <p className="text-stone-500 font-serif italic text-xl">No reviews found in this chronicle.</p>
                </div>
            )}
        </div>
    );
}
