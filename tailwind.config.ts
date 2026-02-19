import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#e6b319",
                "background-light": "#f4ebd0",
                "background-dark": "#1a1814",
                "charcoal": "#12110e",
                "neutral-dark": "#211d11",
                "border-gold": "#383429",
                "muted-gold": "#b8b29d",
                "surface-dark": "#211d11",
                "border-dark": "#383429",
            },
            fontFamily: {
                "display": ["var(--font-inter)", "sans-serif"],
                "serif": ["var(--font-playfair)", "serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            backgroundImage: {
                'parchment': "radial-gradient(circle at 2px 2px, rgba(230, 179, 25, 0.03) 1px, transparent 0)",
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
};
export default config;
