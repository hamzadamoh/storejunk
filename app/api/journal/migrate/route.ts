import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Seeding some articles
        const articles = [
            {
                id: 'victorian-journaling-basics',
                title: 'The Art of Victorian Journaling',
                excerpt: 'Learn the delicate techniques of layering botanical prints and delicate lace in your journal.',
                content: 'Victorian journaling is more than just writing; it is a visual symphony of tactile history...',
                date: '2024-03-15',
                tag: 'Tutorial',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHavqL0J8WOliGBBMqjOzpPBQka_Rsh0f6hdec1J0wjadLj9vd-iEgieJTMh2-eWewqKztDs2dp2-ON5GRVZfl5mNrcTh6yxPxZxDkiGn0yQ5luC6yQqnTRwb-5BcGpfsIP-B19kVMzL-cBj5cLvGxG8gM9H6lbt4aUB5xC_0b83JbyFe8K6o0EutNKAmIdStN3LdUrjylGYTaqY2s8m2IWMKHe8ay5QpL1kKOYMizFGOCznyzPAKb9beQ5v8sB6z_eGw0LB-musV0'
            },
            {
                id: 'gothic-noir-aesthetic',
                title: 'Mastering the Gothic Noir Aesthetic',
                excerpt: 'Dive deep into the shadows with our guide on utilizing dark textures and raven motifs.',
                content: 'The Gothic Noir aesthetic is about finding beauty in the mysterious and the melancholic...',
                date: '2024-03-20',
                tag: 'Inspiration',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9JVAWIhesfgw1ijXx3pqZSXhtBH-QOmCZPv6XscLczyIsWOg9dN5Xnoibhlvuq8b0-hKWH3sntU4KcDFeOQo0eSsCZlBzbl9KoIDsoFfN6C1o_7CixJm6E6Gs0koIZXD55m0WbvafWJ4hBW02g2wsOtXMAGKEBjAtP13MvSMAflngK3IxC7DfqdzpYScbHMb5gU_kpPSISM8xgmOFCCOYmbiScYvnxQMI0dw4TKcwZvV1aCb4cOU5Y9d9xqoAiwPs6ma2NAMbFP7d'
            }
        ];

        const { error: articleError } = await supabase.from('articles').upsert(articles);

        // Add drive_url column if it doesn't exist (conceptual, handled in SQL or by user)
        // For now, we seed the value for midnight-ledger to test
        await supabase.from('products').update({ drive_url: 'https://google.com' }).eq('id', 'midnight-ledger');

        // Check/upsert site settings (Ignore error if table doesn't exist yet)
        const { error: settingsError } = await supabase.from('site_settings').upsert([{ id: 'global', test_mode: false }]);

        return NextResponse.json({
            message: 'Migration attempted.',
            articleError: articleError ? articleError.message : 'Success',
            settingsError: settingsError ? settingsError.message : 'Success'
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Migration failed', details: error.message }, { status: 500 });
    }
}
