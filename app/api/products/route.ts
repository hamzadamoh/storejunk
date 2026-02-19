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
        description,
        file_url as "fileUrl" 
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
        const { id, title, price, type, images, collection_id } = body;
        const description = body.description || null;
        const file_url = body.file_url || null;

        await sql`
      INSERT INTO products (id, title, price, type, images, collection_id, description, file_url)
      VALUES (${id}, ${title}, ${price}, ${type}, ${images}, ${collection_id}, ${description}, ${file_url})
    `;

        return NextResponse.json({ message: 'Product created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
