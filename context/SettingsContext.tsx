"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SettingsContextType = {
    isTestMode: boolean;
    toggleTestMode: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [isTestMode, setIsTestMode] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("isTestMode");
        if (stored) {
            setIsTestMode(JSON.parse(stored));
        }
    }, []);

    const toggleTestMode = () => {
        setIsTestMode((prev) => {
            const newValue = !prev;
            localStorage.setItem("isTestMode", JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <SettingsContext.Provider value={{ isTestMode, toggleTestMode }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
