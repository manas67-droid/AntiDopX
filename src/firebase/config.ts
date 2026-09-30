import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQB5tA5BkvAoFmyzntXnSu6Pi9LRO5ERA",
  authDomain: "antidopx.firebaseapp.com",
  projectId: "antidopx",
  storageBucket: "antidopx.firebasestorage.app",
  messagingSenderId: "431858822021",
  appId: "1:431858822021:web:6b353132c8fa5e443332ec"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
