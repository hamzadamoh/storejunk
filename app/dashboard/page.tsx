"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface Order {
    id: string;
    created_at: string;
    customer_email: string;
    items: any[];
    total: number;
    payment_status: string;
    fulfillment_status: string;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        aov: 0
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [testMode, setTestMode] = useState(false);

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            try {
                // Fetch products count
                const { count: productsCount, error: pError } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true });

                // Fetch all orders for last 30 days
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const { data: orders, error: oError } = await supabase
                    .from('orders')
                    .select('*')
                    .gte('created_at', thirtyDaysAgo.toISOString())
                    .order('created_at', { ascending: false });

                if (oError) {
                    console.error("Orders fetch error:", oError);
                }

                const validOrders = orders || [];

                // Calculate Stats
                const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
                const totalOrders = validOrders.length;
                const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;

                setStats({
                    revenue: totalRevenue,
                    orders: totalOrders,
                    products: productsCount || 0,
                    aov: aov
                });

                // Top 5 Products by extracting items JSON
                const productSales: Record<string, { title: string, sales: number, revenue: number }> = {};
                validOrders.forEach(o => {
                    const items = o.items || [];
                    items.forEach((item: any) => {
                        if (!productSales[item.id]) {
                            productSales[item.id] = { title: item.title, sales: 0, revenue: 0 };
                        }
                        productSales[item.id].sales += (item.quantity || 1);
                        productSales[item.id].revenue += ((item.quantity || 1) * (item.price || 0));
                    });
                });

                const sortedTopProducts = Object.values(productSales)
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5);
                setTopProducts(sortedTopProducts);

                // Recent 5 Orders
                setRecentOrders(validOrders.slice(0, 5));

                // Chart Data (Group by Day)
                const days: Record<string, number> = {};
                for (let i = 29; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    days[formattedDate] = 0;
                }

                validOrders.forEach(o => {
                    const date = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    if (days[date] !== undefined) {
                        days[date] += (o.total || 0);
                    }
                });

                const formattedChartData = Object.keys(days).map(date => ({
                    date,
                    revenue: days[date]
                }));
                setChartData(formattedChartData);

                // Fetch Site Settings
                const { data: settings } = await supabase.from('site_settings').select('test_mode').eq('id', 'global').single();
                if (settings) {
                    setTestMode(settings.test_mode);
                }

            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const toggleTestMode = async () => {
        const newState = !testMode;
        setTestMode(newState);
        try {
            const { error } = await supabase.from('site_settings').upsert([{ id: 'global', test_mode: newState }]);
            if (error) throw error;
        } catch (err) {
            console.error("Failed to update test mode:", err);
            setTestMode(!newState); // revert on error
        }
    };

    if (loading) {
        return <div className="text-stone-500 animate-pulse">Loading overview data...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-serif font-bold text-white">Overview</h1>

                {/* Test Mode Toggle */}
                <div className="flex items-center gap-3 bg-[#1a1a1a] p-2 pr-4 rounded-xl border border-stone-800">
                    <button
                        onClick={toggleTestMode}
                        className={`w-12 h-6 rounded-full transition-colors relative ${testMode ? 'bg-[#e6b319]' : 'bg-stone-700'}`}
                    >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${testMode ? 'translate-x-6' : ''}`}></div>
                    </button>
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                        Payment Test Mode: <span className={testMode ? 'text-[#e6b319]' : 'text-stone-600'}>{testMode ? 'ON' : 'OFF'}</span>
                    </span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue (30d)", value: `$${stats.revenue.toFixed(2)}`, icon: "payments" },
                    { label: "Total Orders (30d)", value: stats.orders, icon: "local_shipping" },
                    { label: "Avg Order Value", value: `$${stats.aov.toFixed(2)}`, icon: "trending_up" },
                    { label: "Total Products", value: stats.products, icon: "inventory_2" }
                ].map((stat, i) => (
                    <div key={i} className="bg-[#1a1a1a] p-6 rounded-2xl border border-stone-800 flex items-center gap-4">
                        <div className="p-4 bg-[#e6b319]/10 rounded-xl text-[#e6b319]">
                            <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-stone-400 text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-stone-800">
                <h2 className="text-xl font-bold text-white mb-6">Revenue Overview</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#e6b319" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#e6b319" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#e6b319' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#e6b319" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-stone-800">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Orders</h2>
                    <div className="space-y-4">
                        {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl border border-stone-800">
                                <div>
                                    <p className="font-bold text-stone-200">{order.customer_email || "Guest"}</p>
                                    <p className="text-sm text-stone-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#e6b319]">${(order.total || 0).toFixed(2)}</p>
                                    <p className="text-xs px-2 py-1 bg-stone-800 text-stone-300 rounded-md mt-1 inline-block uppercase font-medium">
                                        {order.fulfillment_status || 'Pending'}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-stone-500 italic">No recent orders found.</p>
                        )}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-stone-800">
                    <h2 className="text-xl font-bold text-white mb-6">Top Products</h2>
                    <div className="space-y-4">
                        {topProducts.length > 0 ? topProducts.map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl border border-stone-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="font-bold text-stone-200 line-clamp-1">{product.title}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-bold text-stone-200">{product.sales} sold</p>
                                    <p className="text-sm text-[#e6b319]">${product.revenue.toFixed(2)}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-stone-500 italic">No product sales yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
