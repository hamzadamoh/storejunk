import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: process.env.NEXT_PUBLIC_POLAR_SUCCESS_URL +
        "?session_id={CHECKOUT_SESSION_ID}",
    server: "sandbox",
    theme: "dark",
});
