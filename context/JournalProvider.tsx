"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type Article = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    tag: string;
    image_url?: string;
};

type JournalContextType = {
    articles: Article[];
    isLoading: boolean;
    error: string | null;
    getArticleById: (id: string) => Promise<Article | undefined>;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setArticles(data || []);
        } catch (err: any) {
            console.error("Failed to fetch articles", err);
            setError(err.message || "Failed to load articles");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const getArticleById = async (id: string) => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data as Article;
        } catch (err) {
            console.error(`Failed to fetch article ${id}`, err);
            return undefined;
        }
    };

    return (
        <JournalContext.Provider value={{ articles, isLoading, error, getArticleById }}>
            {children}
        </JournalContext.Provider>
    );
}

export function useJournal() {
    const context = useContext(JournalContext);
    if (context === undefined) {
        throw new Error("useJournal must be used within a JournalProvider");
    }
    return context;
}
