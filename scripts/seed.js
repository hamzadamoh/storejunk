const { db } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });

async function seed() {
    const client = await db.connect();

    try {
        // 1. Create Tables
        await client.sql`
      CREATE TABLE IF NOT EXISTS collections (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        hero_image TEXT
      );
    `;

        await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        type VARCHAR(255) NOT NULL,
        images TEXT[] NOT NULL,
        collection_id VARCHAR(255) REFERENCES collections(id),
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        console.log('Tables created.');

        // 2. Seed Collections
        const collections = [
            {
                id: 'gothic-noir',
                title: 'Gothic Noir',
                description: 'Deep shadows, weathered textures, and Victorian mystery.',
                hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhkpEyBUsuL0v4i0q-_bsdQHvtK85z2OHdy4JhQATRUtQCCzLh2Mz385d9O4EznGPS_k4xV_3xWtRPUBokEYRuBQQBXcj5d8yOva8K3NjPUkZy6WTHCPnrG5Q4Fywyw_ztmXaXm56sKvYpefF4qe1JceCb4Xi2j7S9nhJuK-DPeFfQUt3FcYmjRcFst7MQtPvYmDINsnLneMfk8sW4P8yTUJ4mfHkyigbZcCaCt3KcRS9RKZgXV1rtnVqU0Cf21ALKDDCMxWdW2QMF'
            },
            {
                id: 'victorian-ephemera',
                title: 'Victorian Ephemera',
                description: 'Aged parchment, vintage letters, and gilded details.',
                hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEeciNi-E9j6cBXIcX5t_vSYYqaUx4xOS6h6cDpT72hL5WPOHu-e9KdiN8mPEPSP9-rJFpEouBareTwFAHBm27U9v7H_kzyDhR0t4f6CQ2h-cWG-mhVC5akscMWvXIAa-7SByxFK3AJWX4KwSXl7gVuzr_6CS6ZDKNiioPOK-40OqSSLQU7V-QLNj4NHFseTwxjvCYdNOTM8tjMNCHE00GBOlXWNFAmqrVM5LwNDr78briLlem-3rWHNaQvS4CfSETaqmHDLi7AHFG'
            },
            {
                id: 'botanical-grimoires',
                title: 'Botanical Grimoires',
                description: 'Pressed flowers, herbal sketches, and earthy tones.',
                hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt'
            }
        ];

        for (const c of collections) {
            await client.sql`
        INSERT INTO collections (id, title, description, hero_image)
        VALUES (${c.id}, ${c.title}, ${c.description}, ${c.hero_image})
        ON CONFLICT (id) DO NOTHING;
      `;
        }
        console.log('Collections seeded.');

        // 3. Seed Products
        const products = [
            {
                id: "midnight-ledger",
                title: "The Midnight Ledger",
                price: 12.50,
                type: "Digital Kit",
                images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBSSMhJwAKOLgI8LjcxOIZQa5-8WoNWLRtjgJoVZZwUoVR2zPv1XsL5FlTkdWcteWL6XuYNWa9tisbmyjvj2ljFqierAZzWfiW0NtvJOhWT1A1dKJ9Q2kj8Wy9X6UfbAStMkLAYFGQFSqBUJblnt_OvN4AMRaI5rkUNXfyVsHWQ6pp2O-y6_W5Z4fysky9aYyWdpLFDY_XffolkH0RwjVf5HiVZZibP24lqy974CHrXwunUaI24TDEEzSxtSGoZ7_SqzKZG94yqQTUi"],
                collection_id: "gothic-noir",
                description: "A mysterious collection of dark ledger pages."
            },
            {
                id: "witchwood-textures",
                title: "Witchwood Textures",
                price: 9.00,
                type: "Texture Pack",
                images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAC85fD809gP2kLa9-_c9m1sFopYK56CD8ActQqv3hB3RKPQlGLFtr55s6Q0gX0ZuvSJ3zfuuVD1M4xv-WcNvccL8ZYcHOeSg0hgWcUouHZfwft3U9HCRWWi-NueTF_gXqAbfaTg5OQU-yLAqw5__QO1PBrKalQAS-Rsqk5J54mpQrVAS_G9MwrXpgENvUrBYXZPL-jd0JgizVS68Mwt5SCvdK-K5bHPvtxiuwRO3BxLZelmGO76NKsndgQ0vvJ_0O9RvFON4nEhat0"],
                collection_id: "gothic-noir",
                description: "High-contrast woods and bark textures."
            },
            {
                id: "gilded-parchment",
                title: "Gilded Parchment",
                price: 15.00,
                type: "Texture Pack",
                images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAjCDV7VlOVKsPAh6jwpWSa8NyaZ0ULKuDOn-ubQcFagLwKcnkrD0ntosoVSKrsn1aGmHFYuJl-IvPvTAn1sYcYqzRyOKwAS4q79sf4fC_FdTAfrDQPF5pcZvurYTbdSQRH0Bl4zAlzrjKkudizFFyDWSI4Edzt5G6AdpWdQEmS8z4PQQG96VebhEAR7xYS7HgrwTYxwyNLcU1wY7pHpdr1_-ANerSMxhgGDghe_QZqhUIgX7boLOAMcRbO1WYuuF8k0QUOzwu6LUbc"],
                collection_id: "victorian-ephemera",
                description: "Luxurious parchment backgrounds with faux gold foil edges."
            },
            {
                id: "botanical-grimoire",
                title: "Botanical Grimoire",
                price: 14.00,
                type: "Digital Kit",
                images: [
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuA-6O_O1XnvGArSIO_cuyOQOQ39vJ6y55tF2A7Y6wF2t9h1j44u5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9Q7y5H9Hq9yQ3Q5tJ9",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBweIzw8GCv3L1gyjwoQTeTopIEraFAy8MbkphRTqR0t3cCqfHH3uH-IaIzXLdN7FQY5bSeyaK5KWXq2Z4lJZXKxFsOSNsPiPfTqgmUByr_4ISwM_qmVrY9CKKu0ImrX-WiPhFobxJc0M4jqsaTGIoUX3yRfC3VHALWqzWTAgOwBUVvn6rtg9JNgvmDGIPSScjF5T9wTtL9F_whH9vLIeO7rwD86-tjQy5Eh96dAAl04_Y24eDcbVacMbDALt--IVjM2El6lRr7a7c5"
                ],
                collection_id: "botanical-grimoires",
                description: "A comprehensive kit featuring herbarium pages."
            },
            {
                id: "celestial-grimoire",
                title: "Celestial Grimoire Kit",
                price: 18.99,
                type: "Bundle: Pages & Ephemera",
                images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD3TVlQ4VrIl17ygKpXxo_ned8QkGQ2kvhlNCDNtFtICEXPCEr4PGcKZIen3fn6VCWSaoco9Eb1vVH--a7rQLtQuMxn5KUkOejGejm8TstZrOF0eVf6VD9WZGwuCBwm2LpkLw0zSyMluDTSGXgIYlbI13hXjvUWRSIUrfeJ91UpeEpd8teGSJUwKYi6sZwHUjN75ldEAu12PDNSIYdQo4FL39rdQ03V3tohvxLTS-ll6tDrYbVewgUswq0nzSaMJ7lwj8v48aodv823"],
                collection_id: "botanical-grimoires",
                description: "Map the stars with this celestial set."
            }
        ];

        for (const p of products) {
            await client.sql`
        INSERT INTO products (id, title, price, type, images, collection_id, description)
        VALUES (${p.id}, ${p.title}, ${p.price}, ${p.type}, ${p.images}, ${p.collection_id}, ${p.description})
        ON CONFLICT (id) DO NOTHING;
      `;
        }
        console.log('Products seeded.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.end();
    }
}

seed();
