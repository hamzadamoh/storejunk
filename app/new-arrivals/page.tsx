import Link from "next/link";

export default function NewArrivalsPage() {
    const products = [
        {
            title: "The Midnight Ledger Kit",
            price: "$12.50",
            type: "24 High-Res Digital Sheets",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSSMhJwAKOLgI8LjcxOIZQa5-8WoNWLRtjgJoVZZwUoVR2zPv1XsL5FlTkdWcteWL6XuYNWa9tisbmyjvj2ljFqierAZzWfiW0NtvJOhWT1A1dKJ9Q2kj8Wy9X6UfbAStMkLAYFGQFSqBUJblnt_OvN4AMRaI5rkUNXfyVsHWQ6pp2O-y6_W5Z4fysky9aYyWdpLFDY_XffolkH0RwjVf5HiVZZibP24lqy974CHrXwunUaI24TDEEzSxtSGoZ7_SqzKZG94yqQTUi",
        },
        {
            title: "Gilded Parchment Set",
            price: "$15.00",
            type: "15 Gold-Trimmed Textures",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCDV7VlOVKsPAh6jwpWSa8NyaZ0ULKuDOn-ubQcFagLwKcnkrD0ntosoVSKrsn1aGmHFYuJl-IvPvTAn1sYcYqzRyOKwAS4q79sf4fC_FdTAfrDQPF5pcZvurYTbdSQRH0Bl4zAlzrjKkudizFFyDWSI4Edzt5G6AdpWdQEmS8z4PQQG96VebhEAR7xYS7HgrwTYxwyNLcU1wY7pHpdr1_-ANerSMxhgGDghe_QZqhUIgX7boLOAMcRbO1WYuuF8k0QUOzwu6LUbc"
        },
        {
            title: "Celestial Grimoire Kit",
            price: "$18.99",
            type: "Bundle: Pages & Ephemera",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3TVlQ4VrIl17ygKpXxo_ned8QkGQ2kvhlNCDNtFtICEXPCEr4PGcKZIen3fn6VCWSaoco9Eb1vVH--a7rQLtQuMxn5KUkOejGejm8TstZrOF0eVf6VD9WZGwuCBwm2LpkLw0zSyMluDTSGXgIYlbI13hXjvUWRSIUrfeJ91UpeEpd8teGSJUwKYi6sZwHUjN75ldEAu12PDNSIYdQo4FL39rdQ03V3tohvxLTS-ll6tDrYbVewgUswq0nzSaMJ7lwj8v48aodv823"
        },
        {
            title: "Witchwood Texture Pack",
            price: "$9.00",
            type: "30 High-Contrast Textures",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC85fD809gP2kLa9-_c9m1sFopYK56CD8ActQqv3hB3RKPQlGLFtr55s6Q0gX0ZuvSJ3zfuuVD1M4xv-WcNvccL8ZYcHOeSg0hgWcUouHZfwft3U9HCRWWi-NueTF_gXqAbfaTg5OQU-yLAqw5__QO1PBrKalQAS-Rsqk5J54mpQrVAS_G9MwrXpgENvUrBYXZPL-jd0JgizVS68Mwt5SCvdK-K5bHPvtxiuwRO3BxLZelmGO76NKsndgQ0vvJ_0O9RvFON4nEhat0"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-4">
                            New Arrivals
                        </h1>
                        <p className="text-stone-500">Fresh from the studio. Digital downloads for instant creativity.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, i) => (
                        <div key={i} className="group space-y-4">
                            <Link href="/product/botanical-grimoire" className="block relative overflow-hidden rounded-xl bg-white dark:bg-stone-800 shadow-xl aspect-square">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt={product.title}
                                    src={product.img}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Link href="/checkout" className="p-3 bg-primary text-charcoal rounded-full hover:bg-white transition-colors flex items-center justify-center">
                                        <span className="material-symbols-outlined">
                                            add_shopping_cart
                                        </span>
                                    </Link>
                                    <Link href="/product/botanical-grimoire" className="p-3 bg-white text-charcoal rounded-full hover:bg-primary transition-colors flex items-center justify-center">
                                        <span className="material-symbols-outlined">
                                            visibility
                                        </span>
                                    </Link>
                                </div>
                            </Link>
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg dark:text-stone-200">
                                        {product.title}
                                    </h3>
                                    <span className="text-primary font-bold">{product.price}</span>
                                </div>
                                <p className="text-stone-500 text-sm">
                                    {product.type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
