"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";

export default function DynamicProductPage() {
    const { getProductById } = useProducts();
    const { addToCart } = useCart();
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [product, setProduct] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (id) {
            const p = getProductById(id);
            if (p) {
                setProduct(p);
                setSelectedImage(p.images[0]);
            }
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
            });
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
                            <div className="aspect-[4/5] bg-neutral-dark rounded-xl overflow-hidden grunge-border relative group">
                                <div
                                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url('${selectedImage}')`,
                                    }}
                                ></div>
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
                                    <div
                                        className="w-full h-full bg-center bg-cover"
                                        style={{ backgroundImage: `url('${url}')` }}
                                    ></div>
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
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-3xl font-bold text-primary font-serif">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    img: product.images[0],
                                    type: product.type
                                })}
                                className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_0_20px_rgba(230,179,25,0.2)] hover:shadow-[0_0_30px_rgba(230,179,25,0.4)]"
                            >
                                <span className="material-symbols-outlined font-bold">
                                    shopping_cart
                                </span>
                                ADD TO CART
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-transparent border border-primary/50 hover:bg-primary/10 text-primary font-bold py-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                            >
                                BUY IT NOW
                            </button>

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
