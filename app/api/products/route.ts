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
        console.error("Database Error:", error);
        return NextResponse.json({ error: 'Failed to fetch products', details: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    let id, title, price, type, images, collection_id, description, file_url;

    try {
        const body = await request.json();
        /* eslint-disable prefer-const */
        ({ id, title, price, type, images, collection_id } = body);
        description = body.description || null;
        file_url = body.file_url || null;

        await sql`
      INSERT INTO products (id, title, price, type, images, collection_id, description, file_url)
      VALUES (${id}, ${title}, ${price}, ${type}, ${images}, ${collection_id}, ${description}, ${file_url})
    `;

        return NextResponse.json({ message: 'Product created' }, { status: 201 });
    } catch (error) {
        console.error("Database Error:", error);
        const errorMessage = (error as Error).message;

        // Auto-migration: If file_url column is missing, add it and retry
        if (errorMessage.includes('column "file_url" of relation "products" does not exist')) {
            try {
                console.log("Auto-migrating: Adding file_url column...");
                await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url TEXT;`;

                // Retry the insert
                await sql`
                  INSERT INTO products (id, title, price, type, images, collection_id, description, file_url)
                  VALUES (${id}, ${title}, ${price}, ${type}, ${images}, ${collection_id}, ${description}, ${file_url})
                `;
                return NextResponse.json({ message: 'Product created (after auto-migration)' }, { status: 201 });
            } catch (retryError) {
                console.error("Retry failed:", retryError);
                return NextResponse.json({ error: 'Failed to create product even after migration', details: (retryError as Error).message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Failed to create product', details: errorMessage }, { status: 500 });
    }
}
