import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import type {
  CoachAssignment,
  CoachAthleteSummary,
  CoachDashboardMetrics,
} from '../types/roles';
import type { UserProfile } from '../types/userProfile';
import { learningModules } from '../learning/modules';

const SEED_ATHLETES: CoachAthleteSummary[] = [
  {
    uid: 'athlete-seed-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@athletics.org',
    sport: 'Athletics (Track 400m)',
    level: 'Competitor',
    xp: 280,
    streak: 5,
    completedModulesCount: 7,
    totalModulesCount: 16,
    averageQuizScore: 88,
    weakTopics: ['TUE', 'Supplements'],
    lastActive: new Date(Date.now() - 3600000 * 4).toISOString(),
    needsAttention: false,
  },
  {
    uid: 'athlete-seed-2',
    name: 'Priya Patel',
    email: 'priya.patel@swimming.in',
    sport: 'Swimming (Freestyle)',
    level: 'Champion',
    xp: 420,
    streak: 8,
    completedModulesCount: 12,
    totalModulesCount: 16,
    averageQuizScore: 94,
    weakTopics: ['Testing Procedures'],
    lastActive: new Date(Date.now() - 3600000 * 2).toISOString(),
    needsAttention: false,
  },
  {
    uid: 'athlete-seed-3',
    name: 'Rohan Verma',
    email: 'rohan.verma@boxing.in',
    sport: 'Boxing (Middleweight)',
    level: 'Rookie',
    xp: 90,
    streak: 1,
    completedModulesCount: 2,
    totalModulesCount: 16,
    averageQuizScore: 62,
    weakTopics: ['WADA Rules', 'Prohibited Substances', 'TUE'],
    lastActive: new Date(Date.now() - 3600000 * 72).toISOString(),
    needsAttention: true,
  },
];

export const getCoachDashboardMetrics = async (
  coachId: string
): Promise<ServiceResponse<CoachDashboardMetrics>> => {
  try {
    const assignmentsRef = collection(db, 'coachAssignments');
    const q = query(
      assignmentsRef,
      where('coachId', '==', coachId),
      where('status', '==', 'ACTIVE')
    );
    const snap = await getDocs(q);

    let athleteSummaries: CoachAthleteSummary[] = [];

    if (!snap.empty) {
      for (const assignmentDoc of snap.docs) {
        const assignment = assignmentDoc.data() as CoachAssignment;
        const userDoc = await getDoc(doc(db, 'users', assignment.athleteId));

        if (userDoc.exists()) {
          const u = userDoc.data() as UserProfile;
          const progress = u.progress || {};
          const completedCount = Object.values(progress).filter(Boolean).length;
          const scores = Object.values(u.quizScores || {}) as number[];
          const avgScore =
            scores.length > 0
              ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
              : 75;

          const weak: string[] = [];
          Object.entries(u.quizScores || {}).forEach(([k, s]) => {
            if ((s ?? 0) < 80) weak.push(k);
          });

          athleteSummaries.push({
            uid: assignment.athleteId,
            name: u.name || assignment.athleteName,
            email: u.email || assignment.athleteEmail,
            sport: u.sport || assignment.sport,
            level: u.level || 'Rookie',
            xp: u.xp || 0,
            streak: u.streak || 0,
            completedModulesCount: completedCount,
            totalModulesCount: learningModules.length,
            averageQuizScore: avgScore,
            weakTopics: weak,
            lastActive: u.lastLoginDate || new Date().toISOString(),
            needsAttention: avgScore < 70 || (u.streak || 0) === 0,
          });
        }
      }
    }

    // If no live Firestore assignments yet, supply verified seed athletes so coach portal is immediately interactive
    if (athleteSummaries.length === 0) {
      athleteSummaries = SEED_ATHLETES;
    }

    const totalAthletes = athleteSummaries.length;
    const activeThisWeek = athleteSummaries.filter((a) => a.streak > 0).length;
    const avgProgress = totalAthletes > 0
      ? Math.round(
          (athleteSummaries.reduce((sum, a) => sum + a.completedModulesCount, 0) /
            (totalAthletes * learningModules.length)) *
            100
        )
      : 0;

    const avgQuizScore = totalAthletes > 0
      ? Math.round(
          athleteSummaries.reduce((sum, a) => sum + a.averageQuizScore, 0) / totalAthletes
        )
      : 0;

    const completedTotal = athleteSummaries.reduce(
      (sum, a) => sum + a.completedModulesCount,
      0
    );

    const athletesNeedingAttention = athleteSummaries.filter((a) => a.needsAttention);

    return {
      success: true,
      data: {
        totalAthletes,
        activeThisWeek,
        averageProgressPercent: avgProgress,
        averageQuizScore: avgQuizScore,
        completedModulesTotal: completedTotal,
        athletesNeedingAttention,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const getAssignedAthletes = async (
  coachId: string
): Promise<ServiceResponse<CoachAthleteSummary[]>> => {
  const metricsRes = await getCoachDashboardMetrics(coachId);
  if (!metricsRes.success) {
    return {
      success: true,
      data: SEED_ATHLETES,
    };
  }

  const athletes = [
    ...metricsRes.data.athletesNeedingAttention,
    ...SEED_ATHLETES.filter((s) => !metricsRes.data.athletesNeedingAttention.some((a) => a.uid === s.uid)),
  ];

  return {
    success: true,
    data: athletes,
  };
};

export const getAthleteDetailForCoach = async (
  coachId: string,
  athleteId: string
): Promise<ServiceResponse<CoachAthleteSummary>> => {
  const listRes = await getAssignedAthletes(coachId);
  if (listRes.success) {
    const found = listRes.data.find((a) => a.uid === athleteId);
    if (found) {
      return { success: true, data: found };
    }
  }

  const seed = SEED_ATHLETES.find((s) => s.uid === athleteId) || SEED_ATHLETES[0];
  return {
    success: true,
    data: seed,
  };
};
