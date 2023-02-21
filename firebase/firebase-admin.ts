import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const firebaseServiceAccount = JSON.parse(
    String(process.env.FIREBASE_ADMIN_KEY)
);

if (getApps().length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseServiceAccount)
    });
}

export const adminDb = admin.firestore();