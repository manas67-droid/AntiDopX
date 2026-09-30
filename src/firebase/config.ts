import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQB5tA5BkvAoFmyzntXnSu6Pi9LRO5ERA",
  authDomain: "antidopx.firebaseapp.com",
  projectId: "antidopx",
  storageBucket: "antidopx.firebasestorage.app",
  messagingSenderId: "431858822021",
  appId: "1:431858822021:web:6b353132c8fa5e443332ec"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = (() => {
  try {
    const authModule = FirebaseAuth as unknown as {
      initializeAuth?: typeof FirebaseAuth.initializeAuth;
      getReactNativePersistence?: (storage: typeof AsyncStorage) => any;
      getAuth: typeof FirebaseAuth.getAuth;
    };
    if (typeof authModule.initializeAuth === 'function' && typeof authModule.getReactNativePersistence === 'function') {
      return authModule.initializeAuth(app, {
        persistence: authModule.getReactNativePersistence(AsyncStorage),
      });
    }
    return FirebaseAuth.getAuth(app);
  } catch {
    return FirebaseAuth.getAuth(app);
  }
})();

export const db = getFirestore(app);

export default app;
