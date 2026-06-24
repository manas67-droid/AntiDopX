import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from './config';

export const updateDailyStreak = async (
  uid: string
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

    const today = new Date();

    const todayString =
      today.toISOString().split('T')[0];

    const lastLogin =
      userData.lastLoginDate
        ?.split('T')[0];

    console.log('UID:', uid);
    console.log('USER DATA:', userData);
    console.log('LAST LOGIN:', lastLogin);
    console.log('TODAY:', todayString);

    let streak = userData.streak || 1;

    if (lastLogin === todayString) {
      return {
        success: true,
        streak,
      };
    }

    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayString =
      yesterday.toISOString().split('T')[0];

    if (lastLogin === yesterdayString) {
      streak += 1;
    } else {
      streak = 1;
    }

    console.log('NEW STREAK:', streak);

    await updateDoc(userRef, {
      streak,
      lastLoginDate:
        today.toISOString(),
    });

    return {
      success: true,
      streak,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};