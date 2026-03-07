"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            // Set cookie for middleware
            document.cookie = "dashboard_session=true; path=/; max-age=86400;";
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-2xl border border-stone-800 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-black text-[#e6b319] mb-2">TinyStepsArtLTD</h1>
                    <p className="text-stone-400">Admin Dashboard Login</p>
                </div>

                {error && (
                    <div className="bg-red-900/50 text-red-200 p-4 rounded-lg mb-6 border border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-stone-300 mb-2 text-sm">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319] transition-colors"
                            placeholder="admin@tinystepsart.com"
                        />
                    </div>
                    <div>
                        <label className="block text-stone-300 mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-stone-800 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-[#e6b319] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#e6b319] text-[#0f0f0f] font-bold py-3 rounded-lg hover:bg-[#d4a017] transition-colors disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
