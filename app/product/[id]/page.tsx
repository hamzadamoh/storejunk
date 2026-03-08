"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useProducts, Product } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import FallbackImage from "@/components/FallbackImage";
import { supabase } from "@/lib/supabase";

interface Review {
    id: string;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
    verified_purchase: boolean;
}

export default function DynamicProductPage() {
    const { getProductById, getProductsByCollection } = useProducts();
    const { addToCart } = useCart();
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
    const [activeTab, setActiveTab] = useState<"included" | "how" | "license">("included");
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isLoadingRelated, setIsLoadingRelated] = useState(false);
    const [showBuyNowModal, setShowBuyNowModal] = useState(false);
    const [buyNowEmail, setBuyNowEmail] = useState("");

    // Review System State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [avgRating, setAvgRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
    const [reviewForm, setReviewForm] = useState({
        name: "",
        email: "",
        rating: 5,
        comment: ""
    });

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Load Product and Related Products
    useEffect(() => {
        if (id) {
            getProductById(id).then((p) => {
                if (p) {
                    setProduct(p);
                    setSelectedImage(p.images[0]);
                    setActiveIndex(0);

                    // Fetch related products
                    setIsLoadingRelated(true);
                    getProductsByCollection(p.collectionId).then((res) => {
                        // Filter out current product and take 4
                        setRelatedProducts(res.products.filter(item => item.id !== id).slice(0, 4));
                        setIsLoadingRelated(false);
                    });

                    // Fetch Reviews
                    fetchReviews(p.id);
                }
            });
        }
    }, [id, getProductById, getProductsByCollection]);

    const fetchReviews = async (productId: string) => {
        setIsLoadingReviews(true);
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', productId)
            .eq('approved', true)
            .order('created_at', { ascending: false });

        if (data) {
            setReviews(data);
            if (data.length > 0) {
                const sum = data.reduce((acc, r) => acc + r.rating, 0);
                setAvgRating(sum / data.length);
            }
        }
        setIsLoadingReviews(false);
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        setIsSubmittingReview(true);

        const { error } = await supabase
            .from('reviews')
            .insert([{
                product_id: product.id,
                customer_name: reviewForm.name,
                customer_email: reviewForm.email,
                rating: reviewForm.rating,
                comment: reviewForm.comment,
                approved: false // Pending approval
            }]);

        if (!error) {
            setSubmissionStatus("success");
            setReviewForm({ name: "", email: "", rating: 5, comment: "" });
            setTimeout(() => setShowReviewForm(false), 3000);
        } else {
            setSubmissionStatus("error");
        }
        setIsSubmittingReview(false);
    };

    // Gallery navigation
    const nextImage = () => {
        if (!product) return;
        const next = (activeIndex + 1) % product.images.length;
        setActiveIndex(next);
        setSelectedImage(product.images[next]);
    };

    const prevImage = () => {
        if (!product) return;
        const prev = (activeIndex - 1 + product.images.length) % product.images.length;
        setActiveIndex(prev);
        setSelectedImage(product.images[prev]);
    };

    const handleBuyNow = () => {
        if (product) {
            setShowBuyNowModal(true);
        }
    };

    const confirmBuyNow = () => {
        if (!buyNowEmail) {
            alert("Please enter your email to continue.");
            return;
        }
        if (product) {
            router.push(`/api/checkout?products=${product.polar_product_id}&customerEmail=${buyNowEmail}`);
        }
    };

    const jsonLd = useMemo(() => {
        if (!product) return null;
        return {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "image": product.images,
            "description": product.description,
            "sku": product.sku || product.id,
            "offers": {
                "@type": "Offer",
                "url": typeof window !== 'undefined' ? window.location.href : "",
                "priceCurrency": "USD",
                "price": product.price,
                "availability": "https://schema.org/InStock"
            }
        };
    }, [product]);

    if (!product) {
        return (
            <div className="bg-[#0d0d0d] min-h-screen text-stone-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold font-serif italic">Curating your kit...</h1>
                    <Link href="/" className="text-primary hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0d0d0d] text-stone-200 font-display min-h-screen relative overflow-hidden">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }}></div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 md:px-20 py-10 relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 uppercase tracking-widest font-bold">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <Link href={`/collections/${product.collectionId}`} className="hover:text-primary transition-colors capitalize">
                        {product.collectionId.replace('-', ' ')}
                    </Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-stone-300">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Premium Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative group">
                            {/* Gold Glow behind image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

                            <div className="relative bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800/50 aspect-square flex items-center justify-center">
                                {/* Navigation Arrows */}
                                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-charcoal shadow-xl">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-charcoal shadow-xl">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>

                                <div className="absolute top-6 left-6 z-20">
                                    <div className="bg-[#4a1c1c] text-[#f4ebd8] px-4 py-1.5 text-[10px] font-serif font-bold uppercase tracking-[0.2em] rounded-sm border border-black/20 shadow-2xl">
                                        Limited Edition
                                    </div>
                                </div>

                                <div className="w-full h-full overflow-hidden">
                                    <FallbackImage
                                        src={selectedImage}
                                        alt={product.title}
                                        title={product.title}
                                        className="w-full h-full object-contain p-8 transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails with Active Effect */}
                        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1">
                            {product.images.map((url, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setSelectedImage(url); setActiveIndex(i); }}
                                    className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${activeIndex === i ? "ring-2 ring-primary scale-105 shadow-[0_0_20px_rgba(230,179,25,0.3)]" : "opacity-60 hover:opacity-100 border border-stone-800"}`}
                                >
                                    <FallbackImage
                                        src={url}
                                        alt={`${product.title} view ${i + 1}`}
                                        title={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Premium Product Info */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary font-bold text-[10px] tracking-[0.3em] uppercase">
                                    <span className="h-[1px] w-8 bg-primary/40"></span>
                                    <span>{product.type}</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl font-serif font-black dark:text-white leading-tight italic">
                                    {product.title}
                                </h1>

                                <div className="h-[1px] w-full bg-gradient-to-r from-primary/60 via-primary/10 to-transparent"></div>

                                {/* Star Rating Upgrade */}
                                <div className="flex items-center gap-4">
                                    <div className="flex text-primary/30 gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span
                                                key={star}
                                                className="material-symbols-outlined text-xl"
                                                style={{ fontVariationSettings: star <= Math.round(avgRating) ? "'FILL' 1" : "'FILL' 0" }}
                                            >
                                                star
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-stone-500 font-serif italic text-sm">
                                        {reviews.length > 0 ? `${avgRating.toFixed(1)} / 5.0 (${reviews.length} reviews)` : "Be the first to review"}
                                    </span>
                                </div>

                                {/* Pricing Section Upgrade */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-6">
                                        <span className="text-5xl font-black text-primary font-serif italic">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="text-xl text-stone-600 line-through font-serif italic decoration-primary/40 leading-none">
                                                ${(product.price * 1.42).toFixed(2)}
                                            </span>
                                            <span className="text-primary font-bold text-[10px] uppercase tracking-widest mt-1">First Time Discount Applied</span>
                                        </div>
                                    </div>

                                    <p className="text-[#f4ebd8]/60 text-sm italic font-serif">
                                        "Only a few sets left at this boutique price point"
                                    </p>

                                    {/* Pill Styled Countdown */}
                                    <div className="inline-flex items-center gap-3 bg-stone-900/80 border border-stone-800 px-5 py-2.5 rounded-full w-fit shadow-inner">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                        <span className="text-stone-300 text-xs font-bold uppercase tracking-widest">
                                            Special ends in <span className="text-primary tabular-nums">{formatTime(timeLeft)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons Upgrade */}
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => addToCart({
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        img: product.images[0],
                                        type: product.type
                                    })}
                                    className="group relative w-full bg-primary text-charcoal font-serif font-black text-xl py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(230,179,25,0.2)] overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[45deg] -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]"></div>
                                    <div className="flex items-center justify-center gap-3 relative z-10">
                                        <span className="material-symbols-outlined font-black">lock_open</span>
                                        Unlock Kit Access
                                    </div>
                                </button>

                                <style jsx>{`
                                    @keyframes shimmer {
                                        0% { transform: translateX(-200%) skewX(-45deg); }
                                        100% { transform: translateX(300%) skewX(-45deg); }
                                    }
                                `}</style>

                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-transparent border-2 border-stone-800 hover:bg-stone-800/50 text-stone-300 font-serif font-bold py-5 rounded-xl transition-all flex items-center justify-center tracking-widest uppercase text-sm"
                                >
                                    Express Checkout
                                </button>
                            </div>

                            {/* Tabbed Section */}
                            <div className="space-y-6 pt-8 border-t border-stone-800/50">
                                <div className="flex gap-8 border-b border-stone-800/50">
                                    {[
                                        { id: "included", label: "What's Included" },
                                        { id: "how", label: "How To Use" },
                                        { id: "license", label: "License" }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`pb-4 text-sm font-serif italic transition-all relative ${activeTab === tab.id ? "text-primary font-bold" : "text-stone-500 hover:text-stone-300"}`}
                                        >
                                            {tab.label}
                                            {activeTab === tab.id && (
                                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="min-h-[150px] text-stone-400 text-sm leading-relaxed font-serif italic">
                                    {activeTab === "included" && (
                                        <div className="whitespace-pre-wrap transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
                                            {product.description || "Every texture and ephemera piece in this kit is handcrafted at 300 DPI for premium print results."}
                                        </div>
                                    )}
                                    {activeTab === "how" && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                            <p>1. Download your high-resolution PDF/JPG bundle instantly.</p>
                                            <p>2. Print at home or your local boutique print shop (A4 or US Letter).</p>
                                            <p>3. Cut, distress, and weave into your journaling masterpieces.</p>
                                        </div>
                                    )}
                                    {activeTab === "license" && (
                                        <div className="animate-in fade-in slide-in-from-bottom-2">
                                            <p className="mb-4">Standard Personal License included with every purchase.</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Unlimited personal creative projects</li>
                                                <li>Gift physical creations to friends & family</li>
                                                <li>No commercial resale or redistribution of digital files permitted</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-32 pt-24 border-t border-stone-800/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Review Summary */}
                        <div className="lg:col-span-4 space-y-6">
                            <h2 className="font-serif text-4xl font-black italic text-white">Customer Reviews</h2>
                            <div className="flex items-center gap-6">
                                <span className="text-6xl font-black text-primary font-serif italic">{avgRating.toFixed(1)}</span>
                                <div className="space-y-1">
                                    <div className="flex text-primary gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span
                                                key={star}
                                                className="material-symbols-outlined text-2xl"
                                                style={{ fontVariationSettings: star <= Math.round(avgRating) ? "'FILL' 1" : "'FILL' 0" }}
                                            >
                                                star
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-stone-500 text-sm italic font-serif">Based on {reviews.length} approved reviews</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="w-full py-4 border border-primary/30 text-primary font-serif font-bold italic rounded-xl hover:bg-primary/10 transition-all uppercase tracking-widest text-xs"
                            >
                                {showReviewForm ? "Cancel Review" : "Write a Review"}
                            </button>

                            {showReviewForm && (
                                <form onSubmit={handleSubmitReview} className="space-y-4 p-6 bg-stone-900/50 border border-stone-800 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-primary">Your Aesthetic Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={reviewForm.name}
                                            onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none font-serif italic"
                                            placeholder="Gothic Artisan"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-primary">Raven Address (Email)</label>
                                        <input
                                            type="email"
                                            required
                                            value={reviewForm.email}
                                            onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })}
                                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none font-serif italic"
                                            placeholder="collector@darkart.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-primary">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                    className={`material-symbols-outlined text-3xl transition-all ${reviewForm.rating >= star ? "text-primary scale-110" : "text-stone-700 hover:text-stone-500"}`}
                                                    style={{ fontVariationSettings: reviewForm.rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                                                >
                                                    star
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-primary">Your Thoughts (Max 500 chars)</label>
                                        <textarea
                                            required
                                            maxLength={500}
                                            value={reviewForm.comment}
                                            onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                            rows={4}
                                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none font-serif italic resize-none"
                                            placeholder="Speak your truth about this kit..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmittingReview || submissionStatus === "success"}
                                        className="w-full py-4 bg-[#4a1c1c] text-[#f4ebd8] font-serif font-black italic rounded-xl hover:bg-[#5d2323] transition-all disabled:opacity-50"
                                    >
                                        {isSubmittingReview ? "Sending Word..." : submissionStatus === "success" ? "Received 🖤" : "Submit to the Archives"}
                                    </button>
                                    {submissionStatus === "success" && (
                                        <p className="text-primary text-xs text-center font-serif italic animate-pulse">
                                            Thank you! Your review will appear after approval. 🖤
                                        </p>
                                    )}
                                    {submissionStatus === "error" && (
                                        <p className="text-red-400 text-xs text-center font-serif italic">
                                            The ink ran dry. Please try again.
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-8 space-y-8">
                            {isLoadingReviews ? (
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-40 w-full bg-stone-900/40 animate-pulse rounded-2xl"></div>
                                    ))}
                                </div>
                            ) : reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="p-8 bg-stone-950/40 border border-stone-800/50 rounded-2xl space-y-4 hover:border-primary/20 transition-all group">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-serif font-black italic text-lg text-white">{review.customer_name}</h4>
                                                    {review.verified_purchase && (
                                                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm bg-primary/20 text-primary border border-primary/20">
                                                            <span className="material-symbols-outlined text-[10px]">verified</span>
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex text-primary gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span
                                                            key={star}
                                                            className="material-symbols-outlined text-sm"
                                                            style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}
                                                        >
                                                            star
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-stone-600 font-bold uppercase tracking-widest">
                                                {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <p className="text-stone-400 font-serif italic leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-stone-900 rounded-3xl">
                                    <span className="material-symbols-outlined text-stone-700 text-6xl mb-4">edit_note</span>
                                    <p className="text-stone-500 font-serif italic text-xl">Be the first to review this product</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* You May Also Like Section */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-24 border-t border-stone-800/50">
                        <div className="flex items-center justify-between mb-16">
                            <div className="space-y-2">
                                <h2 className="font-serif text-4xl font-black italic text-white drop-shadow-lg">
                                    You May Also Like
                                </h2>
                                <p className="text-stone-500 italic text-sm">Hand-picked companions from the {product.collectionId} collection</p>
                            </div>
                            <Link href={`/collections/${product.collectionId}`} className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                                View Full Collection
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">trending_flat</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {relatedProducts.map((p) => (
                                <div key={p.id} className="group space-y-5">
                                    <Link href={`/product/${p.id}`} className="block relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl aspect-square">
                                        <FallbackImage
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-60 relative z-10"
                                            alt={p.title}
                                            title={p.title}
                                            src={p.images?.[0]}
                                        />
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                            <span className="px-6 py-2 bg-charcoal text-primary border border-primary/30 rounded-full font-serif font-black italic shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                                Discover Kit
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-stone-200">
                                            <h3 className="font-serif font-black italic text-lg line-clamp-1">{p.title}</h3>
                                            <span className="text-primary font-bold">${p.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-stone-600 font-serif italic text-sm">{p.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />

            {/* Buy It Now Email Modal */}
            {showBuyNowModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowBuyNowModal(false)}></div>
                    <div className="relative bg-stone-900 border border-stone-800 p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="text-center space-y-2">
                            <h3 className="font-serif text-2xl font-black italic text-white text-center">Ready to Download?</h3>
                            <p className="text-stone-400 text-sm italic">Enter your email to receive your secure download links instantly after purchase.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-primary">Your Email Address</label>
                                <input
                                    type="email"
                                    value={buyNowEmail}
                                    onChange={(e) => setBuyNowEmail(e.target.value)}
                                    placeholder="collector@artisan.com"
                                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all font-serif italic"
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={confirmBuyNow}
                                className="w-full bg-primary text-charcoal font-serif font-black text-lg py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined font-black">lock_open</span>
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={() => setShowBuyNowModal(false)}
                                className="w-full text-stone-500 text-xs uppercase tracking-widest font-bold hover:text-stone-300 transition-colors"
                            >
                                Nevermind, go back
                            </button>
                        </div>
                        <div className="pt-4 border-t border-stone-800 text-center">
                            <p className="text-[10px] text-stone-600 uppercase tracking-widest font-medium">Secured by Polar.sh</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
