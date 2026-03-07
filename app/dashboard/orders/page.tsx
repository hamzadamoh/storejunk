"use client";

import { useEffect, useState, Fragment } from "react";
import { supabase } from "@/lib/supabase";

interface Order {
    id: string;
    created_at: string;
    customer_email: string;
    items: any[];
    total: number;
    payment_status: string;
    fulfillment_status: string;
}

type TabType = 'All' | 'Pending' | 'Fulfilled' | 'Cancelled';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    }

    const updateOrderStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ fulfillment_status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setOrders(prev => prev.map(o => o.id === id ? { ...o, fulfillment_status: newStatus } : o));
        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Failed to update status.");
        }
    };

    const filteredOrders = orders.filter(o => {
        if (activeTab === 'All') return true;
        return o.fulfillment_status === activeTab;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Fulfilled': return 'bg-green-900/50 text-green-300 border-green-800';
            case 'Pending': return 'bg-yellow-900/50 text-yellow-300 border-yellow-800';
            case 'Cancelled': return 'bg-red-900/50 text-red-300 border-red-800';
            default: return 'bg-stone-800 text-stone-300 border-stone-700';
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold text-white mb-6">Orders</h1>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-4">
                {(['All', 'Pending', 'Fulfilled', 'Cancelled'] as TabType[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium rounded-full text-sm transition-colors ${activeTab === tab ? 'bg-[#e6b319] text-[#0f0f0f]' : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'}`}
                    >
                        {tab} ({tab === 'All' ? orders.length : orders.filter(o => o.fulfillment_status === tab).length})
                    </button>
                ))}
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-stone-800 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-stone-500 animate-pulse">Loading orders...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-8 text-center text-stone-500 italic">No orders found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-900/50 text-stone-400 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Order ID</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Customer</th>
                                    <th className="p-4 font-medium">Items</th>
                                    <th className="p-4 font-medium">Total</th>
                                    <th className="p-4 font-medium">Payment</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800 text-stone-300 text-sm">
                                {filteredOrders.map(order => (
                                    <Fragment key={order.id}>
                                        <tr
                                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                            className="hover:bg-stone-800/20 transition-colors cursor-pointer group"
                                        >
                                            <td className="p-4 font-mono text-xs max-w-[120px] truncate text-stone-400 group-hover:text-stone-200">{order.id}</td>
                                            <td className="p-4 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 truncate max-w-[150px]">{order.customer_email || 'Guest'}</td>
                                            <td className="p-4">{order.items?.length || 0} items</td>
                                            <td className="p-4 font-bold text-[#e6b319]">${(order.total || 0).toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 rounded border bg-stone-800 border-stone-700 text-xs text-stone-300">
                                                    {order.payment_status || 'Paid'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded border text-xs font-bold ${getStatusColor(order.fulfillment_status)}`}>
                                                    {order.fulfillment_status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                        {/* Expanded Details */}
                                        {expandedOrder === order.id && (
                                            <tr className="bg-stone-900/30">
                                                <td colSpan={7} className="p-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-stone-800 rounded-xl p-6 bg-[#0f0f0f]">
                                                        <div>
                                                            <h3 className="font-bold text-white mb-4">Order Items</h3>
                                                            <ul className="space-y-3">
                                                                {order.items?.map((item: any, idx: number) => (
                                                                    <li key={idx} className="flex justify-between items-center text-sm border-b border-stone-800 pb-2">
                                                                        <div className="flex-1">
                                                                            <span className="text-stone-300">{item.title}</span>
                                                                            <span className="text-stone-500 ml-2">x{item.quantity || 1}</span>
                                                                        </div>
                                                                        <span className="text-[#e6b319]">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="space-y-6">
                                                            <div>
                                                                <h3 className="font-bold text-white mb-2">Actions</h3>
                                                                <div className="flex gap-3">
                                                                    {order.fulfillment_status !== 'Fulfilled' && (
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'Fulfilled'); }}
                                                                            className="px-4 py-2 bg-green-900 text-green-100 hover:bg-green-800 rounded-lg text-sm font-bold transition-colors"
                                                                        >
                                                                            Mark Fulfilled
                                                                        </button>
                                                                    )}
                                                                    {order.fulfillment_status !== 'Cancelled' && (
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'Cancelled'); }}
                                                                            className="px-4 py-2 border border-red-900 text-red-400 hover:bg-red-900/30 rounded-lg text-sm font-bold transition-colors"
                                                                        >
                                                                            Cancel Order
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-white mb-2">Customer Details</h3>
                                                                <p className="text-sm text-stone-400">Email: {order.customer_email}</p>
                                                                <p className="text-sm text-stone-400">Order Date: {new Date(order.created_at).toLocaleString()}</p>
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
        </div>
    );
}
