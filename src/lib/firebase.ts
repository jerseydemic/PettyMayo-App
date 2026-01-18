import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';

// Firebase configuration provided by user
const firebaseConfig = {
    apiKey: "AIzaSyB97FFsfV_1whOp7t2GRg3teQK2DbUnvIQ",
    authDomain: "petty-mayo.firebaseapp.com",
    projectId: "petty-mayo",
    storageBucket: "petty-mayo.firebasestorage.app",
    messagingSenderId: "313120633734",
    appId: "1:313120633734:web:2a79d02ef8280760e5b207",
    measurementId: "G-BY79GKX11Y"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
// Initialize Services WITH EXPLICIT MEMORY CACHE
// This prevents 'Failed to obtain exclusive access to persistence layer' errors
// caused by multiple tabs or ghost locks.
export const db = initializeFirestore(app, {
    localCache: memoryLocalCache()
});
export const analytics = getAnalytics(app);
