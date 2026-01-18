
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

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
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';

export const db = initializeFirestore(app, {
    localCache: memoryLocalCache()
});
export const analytics = getAnalytics(app);

// import { enableIndexedDbPersistence } from 'firebase/firestore';

// enableIndexedDbPersistence(db).catch((err) => {
//     if (err.code == 'failed-precondition') {
//         // Multiple tabs open, persistence can only be enabled in one tab at a a time.
//         console.warn('Firestore persistence failed: Multiple tabs open');
//     } else if (err.code == 'unimplemented') {
//         // The current browser does not support all of the features required to enable persistence
//         console.warn('Firestore persistence failed: Browser not supported');
//     }
// });
