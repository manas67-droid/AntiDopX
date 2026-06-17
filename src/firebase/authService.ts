import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';

export const registerUser = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};