import { doc, getDoc, updateDoc } from 'firebase/firestore';

import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import {
  createEmptyMonthlyXP,
  defaultModuleProgress,
} from '../types/userProfile';
import { db } from './config';
import {
  calculateLevel,
  getCurrentWeek,
  normalizeMonthlyXP,
} from './xpUtils';

export const addXP = async (
  uid: string,
  amount: number
): Promise<
  ServiceResponse<{
    xp: number;
    level: string;
    monthlyXP: ReturnType<typeof createEmptyMonthlyXP>;
  }>
> => {
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
    const currentXP = Number(userData.xp || 0);
    const newXP = currentXP + amount;
    const newLevel = calculateLevel(newXP);
    const monthlyXP = normalizeMonthlyXP(userData.monthlyXP);
    const currentWeek = getCurrentWeek();

    monthlyXP[currentWeek] = (monthlyXP[currentWeek] || 0) + amount;

    await updateDoc(userRef, {
      xp: newXP,
      level: newLevel,
      monthlyXP,
    });

    return {
      success: true,
      data: {
        xp: newXP,
        level: newLevel,
        monthlyXP,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
