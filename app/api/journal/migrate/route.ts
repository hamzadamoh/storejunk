import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Since we are using Supabase JS client and don't have direct SQL access here 
        // (usually done via Supabase Dashboard or migrations), we will check for table existence 
        // by trying a fetch, but for this step we'll assume the table structure is needed.
        // NOTE: In a real production app, you'd use Supabase migrations or the SQL Editor.
        // For this demo, we'll try to insert seed data.

        const articles = [
            {
                id: "art-of-coffee-staining",
                title: "The Art of Coffee Staining Paper",
                excerpt: "Achieve that perfect vintage look with simple kitchen ingredients.",
                content: `
                    <p>There is nothing quite like the look and feel of aged paper in a junk journal. While you can buy pre-stained paper, there is a special satisfaction in creating your own using the coffee staining method.</p>
                    <h3>Materials Needed</h3>
                    <ul>
                        <li>Instant coffee (the cheaper, the better for staining!)</li>
                        <li>Hot water</li>
                        <li>Shallow tray or baking dish</li>
                        <li>White printer paper or sketchbook paper</li>
                        <li>Oven (optional, for quick drying)</li>
                    </ul>
                    <h3>The Process</h3>
                    <p>1. Mix a strong batch of coffee. Use more granules than you would for drinking to get a rich, dark stain.</p>
                    <p>2. Pour the coffee into your tray until it's about half an inch deep.</p>
                    <p>3. Submerge each sheet of paper individually. Let it soak for 30 seconds to a minute depending on how much "character" you want.</p>
                    <p>4. Carefully lift the paper and let the excess drip off.</p>
                    <p>5. Lay flat to dry on a towel, or bake in the oven at a very low temperature (around 150°F / 65°C) for a few minutes until crisp.</p>
                    <p><strong>Pro Tip:</strong> Sprinkle a few dry coffee granules or salt on the wet paper for interesting mottled effects!</p>
                `,
                date: "2024-10-12",
                tag: "Tutorial",
                image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfjz1dKOmIoCREWPCnWao4v6Z2g-v7t0Wg8fErPf4zRS1Q5HqxUrwfo_WJ_spjxrAmv-NzBuYTN2Q1ht_2K4u6StquB4BHoVrgIYz7VAe3EwOsox3KfPH17Err7pL3_MSfCZkuSeP1uz_m5L-NjoeqgqGXb5DBfK16p_bW7WNOOpOwaMjew-wnI44Z5FcRETccbsWIhurTP5idjeKXAdYO75zWH9Pky5aMaPoY1vOI3lzSYyI2apI5AtAUq0Uerf3D-9Nt_Kzv25L7"
            },
            {
                id: "history-victorian-ephemera",
                title: "History of Victorian Calling Cards",
                excerpt: "Exploring the etiquette and aesthetics of 19th-century socialite ephemera.",
                content: `
                    <p>In the Victorian era, the calling card was much more than a piece of paper; it was a complex social tool governed by strict rules of etiquette.</p>
                    <p>These cards were typically white, engraved with the owner's name, and often featured beautiful, intricate illustrations of flowers, hands, or birds. Each element had a hidden meaning.</p>
                    <h3>The Language of Flowers</h3>
                    <p>A card featuring a rose might signify love or beauty, while a pansy stood for "thoughts" or remembrance. This secret language allowed Victorians to communicate feelings that were socially difficult to say aloud.</p>
                    <h3>Folding Etiquette</h3>
                    <p>How the card was delivered also mattered. A folded corner could mean different things: the top left corner folded meant the visitor came in person; the top right meant congratulations; the bottom left meant a farewell visit; and the bottom right meant condolences.</p>
                    <p>Today, these cards are highly sought after by junk journalers for their elegance and the "layers" of history they add to a page.</p>
                `,
                date: "2024-09-15",
                tag: "History",
                image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEeciNi-E9j6cBXIcX5t_vSYYqaUx4xOS6h6cDpT72hL5WPOHu-e9KdiN8mPEPSP9-rJFpEouBareTwFAHBm27U9v7H_kzyDhR0t4f6CQ2h-cWG-mhVC5akscMWvXIAa-7SByxFK3AJWX4KwSXl7gVuzr_6CS6ZDKNiioPOK-40OqSSLQU7V-QLNj4NHFseTwxjvCYdNOTM8tjMNCHE00GBOlXWNFAmqrVM5LwNDr78briLlem-3rWHNaQvS4CfSETaqmHDLi7AHFG"
            }
        ];

        // Insert seed data (ignoring duplicates for safety)
        for (const article of articles) {
            await supabase.from('articles').upsert(article);
        }

        // Add drive_url column if it doesn't exist (assuming use of a hypothetical migration tool or manual check)
        // Since we can't easily run raw SQL via the JS client for DDL in some setups,
        // we'll mention it here. In this specific environment, we will assume 
        // the user or a separate tool handles the ALTER TABLE.
        // However, we'll try to update one product to test if drive_url is accessible.
        await supabase.from('products').update({ drive_url: 'https://google.com' }).eq('id', 'midnight-ledger');

        return NextResponse.json({ message: 'Journal migration and product link update attempted.' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Migration failed', details: error.message }, { status: 500 });
    }
}
