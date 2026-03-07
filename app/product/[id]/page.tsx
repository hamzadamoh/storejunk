"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import FallbackImage from "@/components/FallbackImage";

export default function DynamicProductPage() {
    const { getProductById } = useProducts();
    const { addToCart } = useCart();
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [product, setProduct] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins

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

    useEffect(() => {
        if (id) {
            getProductById(id).then((p) => {
                if (p) {
                    setProduct(p);
                    setSelectedImage(p.images[0]);
                }
            });
        }
    }, [id, getProductById]);

    const handleBuyNow = () => {
        if (product) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                img: product.images[0],
                type: product.type
            }, false); // don't open drawer
            router.push("/checkout");
        }
    };

    if (!product) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Product Loading...</h1>
                    <p className="text-stone-500">Or product not found.</p>
                    <Link href="/" className="text-primary hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-neutral-900 dark:text-gray-100 font-display min-h-screen">
            <title>{product.title} | TinyStepsArtLTD</title>
            <meta name="description" content={product.description || `Buy ${product.title} junk journal kit at TinyStepsArtLTD.`} />
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 md:px-20 py-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary">
                        Home
                    </Link>
                    <span className="material-symbols-outlined text-xs">
                        chevron_right
                    </span>
                    <Link href={`/collections/${product.collectionId}`} className="hover:text-primary capitalize">
                        {product.collectionId.replace('-', ' ')}
                    </Link>
                    <span className="material-symbols-outlined text-xs">
                        chevron_right
                    </span>
                    <span className="dark:text-white font-bold">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Gallery */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
                        {/* Main Image */}
                        <div className="flex-1">
                            <div className="bg-neutral-dark rounded-xl overflow-hidden grunge-border relative group">
                                <div className="absolute top-4 left-4 z-10 bg-[#4a1c1c] text-[#f4ebd8] px-3 py-1 text-xs font-serif font-bold uppercase tracking-widest rounded-sm border border-black/20 shadow-lg">
                                    Bestseller
                                </div>
                                <FallbackImage
                                    src={selectedImage}
                                    alt={product.title}
                                    title={product.title}
                                    className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:h-[600px] py-1">
                            {product.images.map((url: string, i: number) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedImage(url)}
                                    className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-neutral-dark rounded-lg overflow-hidden border cursor-pointer transition-all hover:border-primary/50 ${selectedImage === url ? "border-primary" : "border-border-gold"}`}
                                >
                                    <FallbackImage
                                        src={url}
                                        alt={`${product.title} thumbnail ${i + 1}`}
                                        title={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Info (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase">
                                    <span className="material-symbols-outlined text-sm">
                                        auto_awesome
                                    </span>
                                    <span>{product.type}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif dark:text-white leading-tight">
                                    {product.title}
                                </h2>

                                {/* Star Rating & Reviews */}
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex text-primary text-sm">
                                        <span className="material-symbols-outlined shrink-0 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined shrink-0 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined shrink-0 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined shrink-0 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined shrink-0 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                    </div>
                                    <span className="text-stone-600 dark:text-stone-400 font-serif text-sm italic">
                                        4.9 ★ (2,400+ reviews)
                                    </span>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-baseline gap-4 mt-2">
                                    <span className="text-3xl font-bold text-primary font-serif">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="text-xl text-stone-500 line-through font-serif italic">
                                        ${(product.price * 1.42).toFixed(2)}
                                    </span>
                                    <span className="bg-[#4a1c1c] text-[#f4ebd8] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                        Save 30%
                                    </span>
                                    <span className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">timer</span>
                                        Offer ends in {formatTime(timeLeft)}
                                    </span>
                                </div>
                            </div>

                            {/* Benefit Bullets */}
                            <ul className="space-y-2 mt-2">
                                {[
                                    "✓ Instant download after purchase",
                                    "✓ High-res 300 DPI, print-ready files",
                                    "✓ A4 & US Letter included"
                                ].map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                                        <span className="text-[#4a1c1c] dark:text-primary font-bold">{bullet.charAt(0)}</span>
                                        <span className="font-serif italic">{bullet.substring(2)}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Bonus Banner */}
                            <div className="bg-[#f4ebd8] dark:bg-stone-800 border border-[#d4c5b0] dark:border-stone-700 p-4 rounded-lg flex items-center gap-3 mt-2 shadow-sm">
                                <span className="text-2xl">🎁</span>
                                <span className="text-charcoal dark:text-stone-200 font-serif font-bold italic text-sm">
                                    Free matching bookmark sheet included
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                <button
                                    onClick={() => addToCart({
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        img: product.images[0],
                                        type: product.type
                                    })}
                                    className="w-full bg-[#4a1c1c] hover:bg-[#3d1717] text-[#f4ebd8] font-serif font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                                >
                                    <span className="material-symbols-outlined font-bold">
                                        shopping_cart
                                    </span>
                                    Add to Cart
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-transparent border-2 border-[#4a1c1c] hover:bg-[#4a1c1c]/10 dark:border-primary dark:hover:bg-primary/10 text-[#4a1c1c] dark:text-primary font-serif font-bold py-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                                >
                                    Buy It Now
                                </button>
                            </div>

                            {/* Trust Icons Row */}
                            <div className="flex items-center justify-center gap-4 py-4 text-xs font-serif text-stone-500 dark:text-stone-400 italic text-center">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-lg">🔒</span>
                                    <span>Secure Checkout</span>
                                </div>
                                <span className="text-stone-300 dark:text-stone-600">&bull;</span>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-lg">⚡</span>
                                    <span>Instant Delivery</span>
                                </div>
                                <span className="text-stone-300 dark:text-stone-600">&bull;</span>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-lg">🖨️</span>
                                    <span>Print-Ready Files</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border-gold">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                                    Description
                                </h4>
                                <div className="prose prose-invert text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {product.description || "No description available for this product."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
