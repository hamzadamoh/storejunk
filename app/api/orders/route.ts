import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Database Error:", error);
        const errorMessage = (error as Error).message;

        // Auto-create table if it doesn't exist
        if (errorMessage.includes('relation "orders" does not exist')) {
            try {
                await sql`
                    CREATE TABLE IF NOT EXISTS orders (
                        id TEXT PRIMARY KEY,
                        email TEXT,
                        items JSONB NOT NULL,
                        total NUMERIC(10,2) NOT NULL,
                        payment_method TEXT,
                        status TEXT DEFAULT 'completed',
                        is_test BOOLEAN DEFAULT false,
                        created_at TIMESTAMP DEFAULT NOW()
                    );
                `;
                return NextResponse.json([]);
            } catch (createError) {
                return NextResponse.json({ error: 'Failed to create orders table', details: (createError as Error).message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Failed to fetch orders', details: errorMessage }, { status: 500 });
    }
}

export async function POST(request: Request) {
    let id: string, email: string, items: string, total: number, payment_method: string, is_test: boolean;

    try {
        const body = await request.json();
        id = body.id;
        email = body.email || '';
        items = JSON.stringify(body.items);
        total = body.total;
        payment_method = body.payment_method || 'unknown';
        is_test = body.is_test || false;

        await sql`
            INSERT INTO orders (id, email, items, total, payment_method, status, is_test)
            VALUES (${id}, ${email}, ${items}::jsonb, ${total}, ${payment_method}, 'completed', ${is_test})
        `;

        return NextResponse.json({ message: 'Order created' }, { status: 201 });
    } catch (error) {
        console.error("Database Error:", error);
        const errorMessage = (error as Error).message;

        // Auto-create table if it doesn't exist
        if (errorMessage.includes('relation "orders" does not exist')) {
            try {
                await sql`
                    CREATE TABLE IF NOT EXISTS orders (
                        id TEXT PRIMARY KEY,
                        email TEXT,
                        items JSONB NOT NULL,
                        total NUMERIC(10,2) NOT NULL,
                        payment_method TEXT,
                        status TEXT DEFAULT 'completed',
                        is_test BOOLEAN DEFAULT false,
                        created_at TIMESTAMP DEFAULT NOW()
                    );
                `;
                // Retry the insert
                await sql`
                    INSERT INTO orders (id, email, items, total, payment_method, status, is_test)
                    VALUES (${id!}, ${email!}, ${items!}::jsonb, ${total!}, ${payment_method!}, 'completed', ${is_test!})
                `;
                return NextResponse.json({ message: 'Order created (after auto-migration)' }, { status: 201 });
            } catch (retryError) {
                return NextResponse.json({ error: 'Failed to create order even after migration', details: (retryError as Error).message }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Failed to create order', details: errorMessage }, { status: 500 });
    }
}
