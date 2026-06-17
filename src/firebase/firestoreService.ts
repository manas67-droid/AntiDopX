import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';

export const createUserProfile = async (
  uid: string,
  name: string,
  email: string,
  age: string,
  sport: string
) => {
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

  progress: {
  antiDopingBasics: false,
  supplements: false,
  testingProcedures: false,
  tue: false,
  wadaRules: false,
},

  createdAt: new Date().toISOString(),
});

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};