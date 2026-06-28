import { doc, setDoc } from 'firebase/firestore';

import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import {
  createEmptyMonthlyXP,
  defaultModuleProgress,
} from '../types/userProfile';
import { defaultAchievements } from './achievementService';
import { db } from './config';

export const createUserProfile = async (
  uid: string,
  name: string,
  email: string,
  age: string,
  sport: string
): Promise<ServiceResponse<void>> => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid,
      name,
      email,
      age: Number(age),
      sport,
      xp: 0,
      level: 'Rookie',
      streak: 1,
      lastLoginDate: new Date().toISOString(),
      progress: defaultModuleProgress(),
      completedModules: defaultModuleProgress(),
      quizScores: {},
      quizArenaScores: [],
      achievements: defaultAchievements,
      monthlyXP: createEmptyMonthlyXP(),
      dailyMission: {
        date: new Date().toISOString().split('T')[0],
        scenariosCompleted: 0,
        quizQuestionsAnswered: 0,
      },
      recentActivity: [],
      savedMedicines: [],
      createdAt: new Date().toISOString(),
    });

    return { success: true, data: undefined };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
