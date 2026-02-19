import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
            ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url TEXT;
        `;
        return NextResponse.json({ message: 'Migration successful: file_url column added' });
    } catch (error) {
        return NextResponse.json({ error: 'Migration failed', details: error }, { status: 500 });
    }
}
