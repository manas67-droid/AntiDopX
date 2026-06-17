import {
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';

import { db } from './config';

export const completeModule = async (
  uid: string,
  moduleName: string
) => {
  try {
    const userRef = doc(db, 'users', uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const userData = userSnap.data();

    const progress =
      userData.progress || {};

    progress[moduleName] = true;

    await updateDoc(userRef, {
      progress,
    });

    return {
      success: true,
      progress,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};