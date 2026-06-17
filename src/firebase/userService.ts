import { doc, getDoc } from 'firebase/firestore';
import { db } from './config';

export const getUserProfile = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return {
        success: false,
        error: 'User profile not found',
      };
    }

    return {
      success: true,
      data: docSnap.data(),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};