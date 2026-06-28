import {
  doc,
  runTransaction,
} from 'firebase/firestore';

import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import type { RecentActivityEntry } from '../types/userProfile';
import { db } from './config';
import { evaluateAchievements } from './achievementService';
import {
  calculateLevel,
  getCurrentWeek,
  normalizeMonthlyXP,
} from './xpUtils';

export type QuizArenaQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
};

export const QUIZ_ARENA_QUESTIONS: QuizArenaQuestion[] = [
  {
    id: 'arena-1',
    question:
      'Which body publishes the global Prohibited List each year?',
    options: ['WHO', 'WADA', 'IOC', 'FIFA'],
    correctOptionIndex: 1,
  },
  {
    id: 'arena-2',
    question: 'Strict liability means…',
    options: [
      'Coach is responsible',
      "Athlete is solely responsible for what's in their body",
      'Only intentional doping counts',
      'Federations decide',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'arena-3',
    question: 'A TUE is required for…',
    options: [
      'Any vitamin',
      'A prohibited substance needed for a medical condition',
      'All injections',
      'Any prescription',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'arena-4',
    question: 'How long can samples be stored for re-analysis?',
    options: ['2 years', '5 years', '10 years', 'Indefinitely'],
    correctOptionIndex: 2,
  },
  {
    id: 'arena-5',
    question: 'Best resource to check a medication?',
    options: ['Google', 'Global DRO', 'Pharmacist alone', 'Coach'],
    correctOptionIndex: 1,
  },
];

const QUIZ_ARENA_BASE_XP = 180;
const MAX_RECENT_ACTIVITY = 5;

const getTodayDate = () => new Date().toISOString().split('T')[0];

const buildRecentActivity = (
  existing: RecentActivityEntry[] | undefined,
  entry: RecentActivityEntry
): RecentActivityEntry[] =>
  [entry, ...(existing || [])].slice(0, MAX_RECENT_ACTIVITY);

export type QuizArenaSubmissionResult = {
  score: number;
  percentage: number;
  xpEarned: number;
  level: string;
  totalXP: number;
};

export const submitQuizArenaResult = async (
  uid: string,
  correctCount: number,
  totalQuestions: number
): Promise<ServiceResponse<QuizArenaSubmissionResult>> => {
  try {
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const xpEarned = Math.round((percentage / 100) * QUIZ_ARENA_BASE_XP);
    const userRef = doc(db, 'users', uid);
    const today = getTodayDate();

    const transactionResult = await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists()) {
        throw new Error('User not found');
      }

      const userData = userSnap.data();
      const currentXP = Number(userData.xp || 0);
      const newXP = currentXP + xpEarned;
      const newLevel = calculateLevel(newXP);
      const monthlyXP = normalizeMonthlyXP(userData.monthlyXP);
      const currentWeek = getCurrentWeek();
      monthlyXP[currentWeek] = (monthlyXP[currentWeek] || 0) + xpEarned;

      const quizArenaScores = [
        ...(userData.quizArenaScores || []),
        percentage,
      ];

      const dailyMission = userData.dailyMission || {
        date: today,
        scenariosCompleted: 0,
        quizQuestionsAnswered: 0,
      };

      const nextDailyMission =
        dailyMission.date === today
          ? {
              ...dailyMission,
              quizQuestionsAnswered:
                dailyMission.quizQuestionsAnswered + totalQuestions,
            }
          : {
              date: today,
              scenariosCompleted: 0,
              quizQuestionsAnswered: totalQuestions,
            };

      const recentActivity = buildRecentActivity(userData.recentActivity, {
        type: 'quiz',
        description: `Quiz Arena score ${percentage}% (+${xpEarned} XP)`,
        timestamp: new Date().toISOString(),
      });

      transaction.update(userRef, {
        xp: newXP,
        level: newLevel,
        monthlyXP,
        quizArenaScores,
        dailyMission: nextDailyMission,
        recentActivity,
      });

      return {
        score: correctCount,
        percentage,
        xpEarned,
        level: newLevel,
        totalXP: newXP,
      };
    });

    await evaluateAchievements(uid);

    return {
      success: true,
      data: transactionResult,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const getQuizArenaQuestions = (): QuizArenaQuestion[] =>
  QUIZ_ARENA_QUESTIONS;
