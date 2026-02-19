"use client";

import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// This values are the props in the UI
const amount = "15.00";
const currency = "USD";
const style = { "layout": "vertical" };

export default function PayPalButtonWrapper({ amount, currency, showSpinner, fundingSource }: { amount: string, currency: string, showSpinner: boolean, fundingSource?: string }) {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        } as any); // Type cast specific to this reducer action
    }, [currency, showSpinner]);


    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={false}
                forceReRender={[amount, currency, style, fundingSource]}
                fundingSource={fundingSource as any} // Cast to any to avoid strict type issues with specific funding strings
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            intent: "CAPTURE", // Added intent
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={(data, actions) => {
                    if (actions.order) { // Check if actions.order is defined
                        return actions.order.capture().then(function () {
                            // Your code here after capture the order
                        });
                    }
                    return Promise.resolve();
                }}
            />
        </>
    );
}

// Custom styles for spinner
const spinnerStyle = `
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
