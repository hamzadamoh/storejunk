import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { rows } = await sql`
      SELECT 
        id, 
        title, 
        description, 
        hero_image as "heroImage" 
      FROM collections
    `;
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, title, description, hero_image } = body;

        await sql`
      INSERT INTO collections (id, title, description, hero_image)
      VALUES (${id}, ${title}, ${description}, ${hero_image})
    `;

        return NextResponse.json({ message: 'Collection created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
    }
}
