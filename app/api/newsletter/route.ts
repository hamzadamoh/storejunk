import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        // Check if email is provided
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Mock saving to an external service (like ConvertKit, Mailchimp, etc)
        console.log(`[Newsletter API] Subscribed user: ${email}`);

        // Simulate network latency (0.8s) to give the button a chance to show the loading state
        await new Promise((resolve) => setTimeout(resolve, 800));

        return NextResponse.json({ message: 'Successfully subscribed' }, { status: 200 });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
