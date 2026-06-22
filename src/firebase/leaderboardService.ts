import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

import {
  getErrorMessage,
  type ServiceResponse,
} from '../types/serviceResponse';
import { db } from './config';

export type LeaderboardEntry = {
  name: string;
  sport: string;
  xp: number;
  level: string;
  streak: number;
};

export const getLeaderboard = async (
  maxResults = 25
): Promise<ServiceResponse<LeaderboardEntry[]>> => {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('xp', 'desc'),
      limit(maxResults)
    );

    const usersSnap = await getDocs(usersQuery);
    const leaderboard = usersSnap.docs.map((userDoc) => {
      const data = userDoc.data();

      return {
        name: String(data.name || 'Athlete'),
        sport: String(data.sport || 'Unknown sport'),
        xp: Number(data.xp || 0),
        level: String(data.level || 'Rookie'),
        streak: Number(data.streak || 0),
      };
    });

    return {
      success: true,
      data: leaderboard,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
