"use client";

import { useState } from "react";

interface FallbackImageProps {
    src?: string | null;
    alt: string;
    title: string;
    className?: string;
}

export default function FallbackImage({ src, alt, title, className = "" }: FallbackImageProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className={`flex items-center justify-center bg-stone-800 p-4 text-center ${className}`}>
                <span className="text-[#f4ebd8] font-serif italic text-xl px-2 leading-tight drop-shadow-md">
                    {title}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`object-cover bg-transparent ${className}`}
            onError={() => setHasError(true)}
        />
    );
}
