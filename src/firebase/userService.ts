import { doc, getDoc } from 'firebase/firestore';

import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import type { UserProfile } from '../types/userProfile';
import {
  createEmptyMonthlyXP,
  defaultModuleProgress,
} from '../types/userProfile';
import { defaultAchievements } from './achievementService';
import { db } from './config';
import { getTotalMonthlyXP, normalizeMonthlyXP } from './xpUtils';

const parseUserProfile = (
  uid: string,
  data: Record<string, unknown>
): UserProfile => ({
  uid,
  name: String(data.name || 'Athlete'),
  email: String(data.email || ''),
  age: Number(data.age || 0),
  sport: String(data.sport || 'Unknown'),
  xp: Number(data.xp || 0),
  level: String(data.level || 'Rookie'),
  streak: Number(data.streak || 0),
  lastLoginDate: data.lastLoginDate
    ? String(data.lastLoginDate)
    : undefined,
  lastSpinDate: data.lastSpinDate
    ? String(data.lastSpinDate)
    : undefined,
  progress: {
    ...defaultModuleProgress(),
    ...((data.progress as UserProfile['progress']) || {}),
  },
  completedModules: (data.completedModules as UserProfile['completedModules']) || {},
  quizScores: (data.quizScores as UserProfile['quizScores']) || {},
  quizArenaScores: (data.quizArenaScores as number[]) || [],
  achievements: {
    ...defaultAchievements,
    ...((data.achievements as UserProfile['achievements']) || {}),
  },
  monthlyXP: normalizeMonthlyXP(
    data.monthlyXP as UserProfile['monthlyXP']
  ),
  dailyMission: data.dailyMission as UserProfile['dailyMission'],
  recentActivity: (data.recentActivity as UserProfile['recentActivity']) || [],
  savedMedicines: (data.savedMedicines as UserProfile['savedMedicines']) || [],
  createdAt: String(data.createdAt || new Date().toISOString()),
});

export const getUserProfile = async (
  uid: string
): Promise<ServiceResponse<UserProfile>> => {
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
      data: parseUserProfile(uid, docSnap.data()),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const getUserMonthlyXPTotal = (profile: UserProfile): number =>
  getTotalMonthlyXP(profile.monthlyXP || createEmptyMonthlyXP());
