import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types/models';
import { auth, db } from './firebase';

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signupTeacher(
  email: string,
  password: string,
  teacherName: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const profile: UserProfile = { role: 'teacher', teacherName };
  await setDoc(doc(db, 'users', credential.user.uid), profile);

  return credential;
}

export async function getMyProfile(uid: string) {
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function logout() {
  return signOut(auth);
}
