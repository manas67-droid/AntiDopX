import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { learningModules } from '../learning/modules';
import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import { db } from './config';

export type AchievementKey =
  | 'firstModule'
  | 'threeModules'
  | 'fiveModules'
  | 'xp100'
  | 'streak7';

export type Achievements = Record<AchievementKey, boolean>;

export type AchievementEvaluation = {
  achievements: Achievements;
  completedModules: number;
  newlyUnlocked: string[];
};

export const defaultAchievements: Achievements = {
  firstModule: false,
  threeModules: false,
  fiveModules: false,
  xp100: false,
  streak7: false,
};

const achievementLabels: Record<AchievementKey, string> = {
  firstModule: 'First Module',
  threeModules: '3 Modules Completed',
  fiveModules: '5 Modules Completed',
  xp100: '100 XP Earned',
  streak7: '7 Day Streak',
};

const achievementKeys = Object.keys(
  defaultAchievements
) as AchievementKey[];

const normalizeAchievements = (
  achievements?: Partial<Achievements>
): Achievements => ({
  ...defaultAchievements,
  ...(achievements || {}),
});

export const getAchievements = async (
  uid: string
): Promise<ServiceResponse<Achievements>> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      data: normalizeAchievements(
        userSnap.data().achievements
      ),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const evaluateAchievements = async (
  uid: string
): Promise<ServiceResponse<AchievementEvaluation>> => {
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
    const progress = userData.progress || {};
    const existingAchievements = normalizeAchievements(
      userData.achievements
    );
    const completedModules = learningModules.filter((module) =>
      Boolean(progress[module.moduleKey])
    ).length;
    const xp = Number(userData.xp || 0);
    const streak = Number(userData.streak || 0);

    const nextAchievements: Achievements = {
      firstModule:
        existingAchievements.firstModule ||
        completedModules >= 1,
      threeModules:
        existingAchievements.threeModules ||
        completedModules >= 3,
      fiveModules:
        existingAchievements.fiveModules ||
        completedModules >= 5,
      xp100:
        existingAchievements.xp100 ||
        xp >= 100,
      streak7:
        existingAchievements.streak7 ||
        streak >= 7,
    };

    const newlyUnlocked = achievementKeys
      .filter(
        (key) =>
          !existingAchievements[key] &&
          nextAchievements[key]
      )
      .map((key) => achievementLabels[key]);

    const hasChanges = achievementKeys.some(
      (key) =>
        existingAchievements[key] !== nextAchievements[key]
    );

    if (hasChanges) {
      await updateDoc(userRef, {
        achievements: nextAchievements,
      });
    }

    return {
      success: true,
      data: {
        achievements: nextAchievements,
        completedModules,
        newlyUnlocked,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
