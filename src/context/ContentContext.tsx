import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../data/mock';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';

interface Settings {
    adsenseId: string;
    adsenseSlotId?: string;
    analyticsId?: string;
}

interface ContentContextType {
    articles: Article[];
    settings: Settings;
    getArticle: (slug: string) => Article | undefined;
    addArticle: (article: Article) => void;
    updateArticle: (id: string, updates: Partial<Article>) => void;
    deleteArticle: (id: string) => void;
    reorderArticles: (newOrder: Article[]) => void;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
    const [articles, setArticles] = useState<Article[]>([]);

    // Settings now synced with Firestore
    const [settings, setSettings] = useState<Settings>({ adsenseId: '', analyticsId: '' });

    // Real-time Sync with Firestore (Articles & Settings)
    useEffect(() => {
        // Subscribe to Articles
        const unsubArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data() as Article);

            // Sort by 'order' (ascending) if available, otherwise by 'id' (descending/newest)
            data.sort((a, b) => {
                const orderA = a.order ?? Number.MAX_SAFE_INTEGER; // Default to end of list
                const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

                if (orderA !== orderB) return orderA - orderB;

                // Tie-breaker: Newest first (assuming ID is timestamp)
                return b.id > a.id ? 1 : -1;
            });

            setArticles(data);
        });

        // Subscribe to Global Settings
        const settingsDocRef = doc(db, 'settings', 'global');
        const unsubSettings = onSnapshot(settingsDocRef, (snapshot) => {
            if (snapshot.exists()) {
                setSettings(snapshot.data() as Settings);
            } else {
                // Auto-Migrate: If DB is empty but LocalStorage has settings, upload them.
                const local = localStorage.getItem('pm_settings');
                if (local) {
                    try {
                        const parsed = JSON.parse(local);
                        if (parsed.adsenseId || parsed.analyticsId) {
                            console.log("Migrating local settings to cloud...");
                            setDoc(settingsDocRef, parsed);
                        }
                    } catch (e) {
                        console.error("Migration failed", e);
                    }
                }
            }
        });

        return () => {
            unsubArticles();
            unsubSettings();
        };
    }, []);

    const getArticle = (slug: string) => articles.find(a => a.slug === slug);

    const addArticle = async (article: Article) => {
        console.log("Adding article to Firestore:", article.id);
        // Save to Firestore using the ID as the document key
        await setDoc(doc(db, 'articles', article.id), article);
        console.log("Article added successfully:", article.id);
    };

    const updateArticle = async (id: string, updates: Partial<Article>) => {
        console.log("Updating article:", id);
        await updateDoc(doc(db, 'articles', id), updates);
        console.log("Article updated:", id);
    };

    const deleteArticle = async (id: string) => {
        if (confirm('Delete this article?')) {
            try {
                console.log("Deleting article:", id);
                await deleteDoc(doc(db, 'articles', id));
                console.log("Article deleted:", id);
            } catch (error: any) {
                console.error("Failed to delete article:", error);
                alert(`Failed to delete: ${error.message || error}`);
            }
        }
    };

    const reorderArticles = async (newOrder: Article[]) => {
        // Optimistic UI Update
        setArticles(newOrder);

        // Batch update to Firestore
        try {
            const batch = writeBatch(db);
            console.log(`Attempting to reorder ${newOrder.length} articles...`);

            newOrder.forEach((article, index) => {
                const docRef = doc(db, 'articles', article.id);
                // Important: Ensure we are only sending the 'order' field, not the whole object
                batch.update(docRef, { order: index });
            });
            await batch.commit();
            console.log("Reorder saved successfully.");
        } catch (error: any) {
            console.error("Failed to save reorder:", error);
            alert(`Failed to save new order: ${error.message || error}`);
        }
    };

    const updateSettings = async (newSettings: Partial<Settings>) => {
        // Optimistic update
        setSettings(prev => ({ ...prev, ...newSettings }));

        try {
            await setDoc(doc(db, 'settings', 'global'), { ...settings, ...newSettings });
        } catch (e) {
            console.error("Failed to save settings globally:", e);
            alert("Failed to save settings to the cloud.");
        }
    };

    return (
        <ContentContext.Provider value={{ articles, settings, getArticle, addArticle, updateArticle, deleteArticle, reorderArticles, updateSettings }}>
            {children}
        </ContentContext.Provider>
    );
}

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) throw new Error('useContent must be used within a ContentProvider');
    return context;
};
