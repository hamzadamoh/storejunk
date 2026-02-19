import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { rows } = await sql`
      SELECT 
        id, 
        title, 
        price, 
        type, 
        images, 
        collection_id as "collectionId", 
        description 
      FROM products 
      ORDER BY created_at DESC
    `;
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, title, price, type, images, collection_id, description } = body;

        await sql`
      INSERT INTO products (id, title, price, type, images, collection_id, description)
      VALUES (${id}, ${title}, ${price}, ${type}, ${images}, ${collection_id}, ${description})
    `;

        return NextResponse.json({ message: 'Product created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
