import { Webhooks } from "@polar-sh/nextjs";
import { supabase } from "@/lib/supabase";

export const POST = Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
    onOrderPaid: async (payload: any) => {
        // Extract order details
        const { customer_email, customer_name, amount, id } = payload.data;

        // Get product details from metadata
        const items = payload.data.items ?? [];

        // Insert order into Supabase
        await supabase.from("orders").insert({
            customer_email,
            customer_name,
            items: items,
            total: amount / 100,
            status: "fulfilled",
            payment_status: "paid",
            stripe_session_id: id,
        });
    },
});
