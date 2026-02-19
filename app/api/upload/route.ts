import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || !request.body) {
        return NextResponse.json({ error: 'Filename and body are required' }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN is not set' }, { status: 500 });
    }

    try {
        const blob = await put(filename, request.body, {
            access: 'public',
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
