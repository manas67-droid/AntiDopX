import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';

const calculateLevel = (xp: number) => {
  if (xp >= 1000) return 'Elite Athlete';
  if (xp >= 300) return 'Champion';
  if (xp >= 20) return 'Competitor';
  return 'Rookie';
};

export const addXP = async (
  uid: string,
  amount: number
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

    const currentXP = userData.xp || 0;

    const newXP = currentXP + amount;

    const newLevel = calculateLevel(newXP);

    await updateDoc(userRef, {
      xp: newXP,
      level: newLevel,
    });

    return {
      success: true,
      xp: newXP,
      level: newLevel,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};