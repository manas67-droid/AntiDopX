import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import type { ModuleKey } from '../learning/modules';
import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import { db } from './config';

export const completeModule = async (
  uid: string,
  moduleName: ModuleKey,
  quizScore?: number
): Promise<
  ServiceResponse<{
    progress: Record<ModuleKey, boolean>;
    completedModules: Partial<Record<ModuleKey, boolean>>;
    quizScores: Partial<Record<ModuleKey, number>>;
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
    const progress = {
      ...(userData.progress || {}),
      [moduleName]: true,
    };
    const completedModules = {
      ...(userData.completedModules || {}),
      [moduleName]: true,
    };
    const quizScores = {
      ...(userData.quizScores || {}),
    };

    if (quizScore !== undefined) {
      quizScores[moduleName] = quizScore;
    }

    await updateDoc(userRef, {
      progress,
      completedModules,
      quizScores,
      recentActivity: [
        {
          type: 'module',
          description: `Completed ${moduleName}`,
          timestamp: new Date().toISOString(),
        },
        ...(userData.recentActivity || []),
      ].slice(0, 5),
    });

    return {
      success: true,
      data: {
        progress,
        completedModules,
        quizScores,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
