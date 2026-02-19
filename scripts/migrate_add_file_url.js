const { db } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    const client = await db.connect();
    try {
        await client.sql`
            ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url TEXT;
        `;
        console.log('Migration successful: file_url column added.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
