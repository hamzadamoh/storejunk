"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useCollections } from "@/context/CollectionContext";
import { useCart } from "@/context/CartContext";
import FallbackImage from "@/components/FallbackImage";

export default function Home() {
  const { products, isLoading: productsLoading, error: productsError, hasMore, loadMore } = useProducts();
  const { collections } = useCollections();
  const { addToCart } = useCart();
  const newArrivals = products; // Already descending order from context

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300">
      <Navbar />
      <main>
        {/* Hero Section: Layered Paper Aesthetic */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal px-6">
          {/* Decorative Background Elements */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLafap-MoFFSS6iowwQFeZSGLNY2UvYmcFEZvi2fwKYnJwwvb3IUOOEVvoXiT6cyt3h6RJ6HJssIWEZCYA9OLecfBTYA2L3V_ZSYpPIavA2wiUmd7fFO9bzMXbqVWwA-ynMJZBk_1Ox-uwjlQqhNI77Rb7oh3PfXem69qg-V6ZENuh8lcEBC3gl9xVvv1FAp_ARIwULfBUOXQ95bCf0mh5pyDVlT85BLSE0E_vr-4XATzIhB2LktMhAKh2Fg5vcg6icfiyEWlkT-wU')",
            }}
          ></div>
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">stars</span>{" "}
                Modern Vintage Shop
              </div>
              <h1 className="font-serif text-6xl md:text-8xl text-white leading-[1.1] font-black italic">
                Curated Kits for <br />
                <span className="text-primary not-italic">the Modern Soul</span>
              </h1>
              <p className="text-stone-400 text-lg md:text-xl max-w-xl leading-relaxed">
                Discover the high-fidelity aesthetic of Gothic Chic and
                Victorian ephemera. Digital textures handcrafted for your next
                journaling masterpiece.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="/product/botanical-grimoire"
                  className="w-full sm:w-auto px-10 py-4 bg-primary text-charcoal font-bold rounded-lg hover:shadow-[0_0_20px_rgba(230,179,25,0.4)] transition-all flex items-center justify-center"
                >
                  Shop All Kits
                </Link>
                <Link
                  href="/lookbook"
                  className="w-full sm:w-auto px-10 py-4 border border-stone-700 text-white font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center"
                >
                  View Lookbook
                </Link>
              </div>
            </div>
            {/* Layered Paper Visual */}
            <div className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full max-w-[500px]">
              <div className="absolute inset-0 bg-stone-200 rotate-6 translate-x-4 paper-layer rounded-sm overflow-hidden border-8 border-white">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale"
                  alt="Vintage botanical paper textures stacked"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8jPsKGKpXG47LuiIrDIITMcUaiJf--rFdee3yvdfccCrqPCwHLIeWM1fVLaOsLv36pQM8XlviU4rbdQeRargLZViPawMTJLTDFeXpH38CxyD3P94WOJ4OSEXs9seik_Yg294hdWlpztuYSz1IE4pW5Oy4ImFH1pAEWRsgT0oelUlDoSoPF5zmeuq6k9qyUYBbn1BhPmqI8BY6_MiFq9TPSsuiHE-Tqaf2YaykHn7nIY9XnKT79-OCKFQJzKnPOyVbVvZAX-qgY3Jf"
                />
              </div>
              <div className="absolute inset-0 bg-stone-300 -rotate-3 -translate-x-4 translate-y-4 paper-layer rounded-sm overflow-hidden border-8 border-white">
                <img
                  className="w-full h-full object-cover opacity-80"
                  alt="Gothic noir dark paper textures"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9JVAWIhesfgw1ijXx3pqZSXhtBH-QOmCZPv6XscLczyIsWOg9dN5Xnoibhlvuq8b0-hKWH3sntU4KcDFeOQo0eSsCZlBzbl9KoIDsoFfN6C1o_7CixJm6E6Gs0koIZXD55m0WbvafWJ4hBW02g2wsOtXMAGKEBjAtP13MvSMAflngK3IxC7DfqdzpYScbHMb5gU_kpPSISM8xgmOFCCOYmbiScYvnxQMI0dw4TKcwZvV1aCb4cOU5Y9d9xqoAiwPs6ma2NAMbFP7d"
                />
              </div>
              <div className="absolute inset-0 bg-white rotate-2 paper-layer rounded-sm overflow-hidden border-8 border-white group cursor-pointer">
                <Link href="/product/botanical-grimoire">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Floral Victorian ephemera background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHavqL0J8WOliGBBMqjOzpPBQka_Rsh0f6hdec1J0wjadLj9vd-iEgieJTMh2-eWewqKztDs2dp2-ON5GRVZfl5mNrcTh6yxPxZxDkiGn0yQ5luC6yQqnTRwb-5BcGpfsIP-B19kVMzL-cBj5cLvGxG8gM9H6lbt4aUB5xC_0b83JbyFe8K6o0EutNKAmIdStN3LdUrjylGYTaqY2s8m2IWMKHe8ay5QpL1kKOYMizFGOCznyzPAKb9beQ5v8sB6z_eGw0LB-musV0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <span className="text-white font-serif italic text-2xl font-bold">
                      New: Botanical Grimoires
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* As Featured In */}
        <section className="py-8 border-b border-stone-200 dark:border-white/5 bg-stone-100 dark:bg-stone-900 text-center px-6">
          <p className="text-stone-500 font-serif italic text-sm mb-6">As featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-serif font-bold text-xl text-stone-400 dark:text-stone-300">Journaler's Digest</span>
            <span className="font-serif font-bold text-xl text-stone-400 dark:text-stone-300">Victorian Times</span>
            <span className="font-serif font-bold text-xl text-stone-400 dark:text-stone-300">Gothic Aesthetic</span>
            <span className="font-serif font-bold text-xl text-stone-400 dark:text-stone-300">The Daily Crafter</span>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-8 bg-[#f4ebd8] dark:bg-stone-800 text-charcoal dark:text-stone-300 border-y border-stone-300 dark:border-stone-700">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 font-serif text-lg md:text-xl text-center">
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold text-2xl">4,800+</span>
              <span className="italic">happy journalers</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-2xl">5★</span>
              <span className="italic">average rating</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold text-2xl">250+</span>
              <span className="italic">digital kits</span>
            </div>
          </div>
        </section>

        {/* Featured Collections Grid */}
        <section className="py-24 px-6 lg:px-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl font-black text-charcoal dark:text-white">
                  Featured Collections
                </h2>
                <div className="h-1 w-24 bg-primary"></div>
              </div>
              <p className="text-stone-500 max-w-md italic">
                Expertly designed digital kits sorted by aesthetic theme and
                historical era.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link key={collection.id} href={`/collections/${collection.id}`} className="group relative overflow-hidden bg-stone-900 rounded-xl aspect-[4/3] sm:aspect-[3/4] cursor-pointer block">
                  <FallbackImage
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    alt={collection.title}
                    title={collection.title}
                    src={collection.heroImage}
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-serif text-3xl font-bold text-white mb-2 italic">
                      {collection.title}
                    </h3>
                    <p className="text-stone-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                      {collection.description}
                    </p>
                    <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                      Explore Collection{" "}
                      <span className="material-symbols-outlined">
                        trending_flat
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-6 lg:px-20 bg-stone-50 dark:bg-stone-900/50 border-t border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl font-black text-charcoal dark:text-white">
                How It Works
              </h2>
              <p className="text-stone-500 italic max-w-xl mx-auto font-medium">
                No waiting. Your files arrive the second you checkout.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative">
              {/* Add decorative connecting line behind steps for md+ screens */}
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-stone-300 dark:bg-stone-700 z-0"></div>

              {[
                { num: "1", title: "Browse & Buy", icon: "shopping_basket" },
                { num: "2", title: "Instant Download", icon: "cloud_download" },
                { num: "3", title: "Print at Home", icon: "print" },
                { num: "4", title: "Create & Journal", icon: "auto_stories" },
              ].map((step) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#f4ebd8] dark:bg-stone-800 border-2 border-primary flex items-center justify-center text-primary font-serif text-2xl font-bold shadow-md">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-xl text-charcoal dark:text-stone-200">{step.title}</h3>
                  <span className="material-symbols-outlined text-[#d4af37]/70 text-5xl drop-shadow-sm">
                    {step.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Product Grid */}
        <section className="py-24 px-6 lg:px-20 bg-stone-100 dark:bg-charcoal/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-4xl font-bold dark:text-white">
                New Arrivals
              </h2>
              <Link
                href="/shop"
                className="text-primary font-bold hover:underline underline-offset-8"
              >
                View All Products
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <div key={product.id} className="group space-y-4">
                  <Link href={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl bg-white dark:bg-stone-800 shadow-xl aspect-square">
                    <div className="absolute top-3 left-3 z-10 bg-[#4a1c1c] text-[#f4ebd8] px-2 py-0.5 text-[10px] font-serif font-bold uppercase tracking-widest rounded-sm border border-black/20 shadow-lg">New</div>
                    <FallbackImage
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                      alt={product.title}
                      title={product.title}
                      src={product.images?.[0]}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            img: product.images[0],
                            type: product.type
                          });
                        }}
                        className="p-3 bg-primary text-charcoal rounded-full hover:bg-white transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined">
                          add_shopping_cart
                        </span>
                      </button>
                      <Link href={`/product/${product.id}`} className="p-3 bg-white text-charcoal rounded-full hover:bg-primary transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Link>
                    </div>
                  </Link>
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg dark:text-stone-200 line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                        <span className="text-stone-500 text-xs line-through font-serif italic">${(product.price * 1.42).toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-stone-500 text-sm">
                      {product.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={productsLoading}
                  className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-charcoal transition-colors disabled:opacity-50"
                >
                  {productsLoading ? "Loading..." : "Load More Arrivals"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Journaling Tip Section / CTA Overlay */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative bg-background-light dark:bg-stone-800 shadow-2xl flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-12 space-y-6">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">
                Journaler of the Month
              </span>
              <h2 className="font-serif text-3xl italic font-bold dark:text-white">
                "TinyStepsArt kits transformed my creative workflow. The textures
                are unparalleled."
              </h2>
              <p className="text-stone-500">— Elena V., Junk Journal Artist</p>
              <Link href="/journal" className="px-8 py-3 border-2 border-charcoal dark:border-primary text-charcoal dark:text-primary font-bold rounded-lg hover:bg-primary hover:text-charcoal transition-all inline-block text-center">
                Read Her Story
              </Link>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <img
                className="w-full h-full object-cover min-h-[400px]"
                alt="Journaler hands writing in a vintage book"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfjz1dKOmIoCREWPCnWao4v6Z2g-v7t0Wg8fErPf4zRS1Q5HqxUrwfo_WJ_spjxrAmv-NzBuYTN2Q1ht_2K4u6StquB4BHoVrgIYz7VAe3EwOsox3KfPH17Err7pL3_MSfCZkuSeP1uz_m5L-NjoeqgqGXb5DBfK16p_bW7WNOOpOwaMjew-wnI44Z5FcRETccbsWIhurTP5idjeKXAdYO75zWH9Pky5aMaPoY1vOI3lzSYyI2apI5AtAUq0Uerf3D-9Nt_Kzv25L7"
              />
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="py-32 px-6 relative bg-charcoal overflow-hidden border-t-2 border-primary/20">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-charcoal/80 to-transparent"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl font-black text-white italic drop-shadow-xl">
                Join the Inner Circle
              </h2>
              <p className="text-stone-300 text-xl font-medium">
                Get a <span className="text-primary font-bold">FREE Gothic Noir kit</span> + early access to new drops
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-4" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your raven address..."
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-white/5 border border-white/20 text-white rounded-xl px-6 py-4 outline-none focus:border-primary focus:bg-white/10 transition-all font-medium placeholder:text-stone-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-primary hover:bg-white text-charcoal font-bold px-10 py-4 rounded-xl shadow-[0_0_20px_rgba(230,179,25,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Subscribed!" : "Claim My Freebie"}
              </button>
            </form>
            {status === "success" && (
              <p className="text-primary font-bold mt-2 font-serif italic">Welcome to the inner circle. Your freebie is on its way!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 font-bold mt-2 font-serif italic">The raven lost your letter. Please try again.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
