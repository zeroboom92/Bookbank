import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import type { Entry } from '@/types/models';

export async function createEntry(input: Omit<Entry, 'createdAt'>) {
  const entryId = `${input.studentUid}_${input.bookId}`;
  const entryRef = doc(db, 'entries', entryId);

  await runTransaction(db, async (transaction) => {
    const exists = await transaction.get(entryRef);

    if (exists.exists()) {
      throw new Error('duplicate_entry');
    }

    transaction.set(entryRef, {
      ...input,
      createdAt: serverTimestamp()
    });
  });
}

export async function listStudentEntries(studentUid: string) {
  const q = query(
    collection(db, 'entries'),
    where('studentUid', '==', studentUid),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}

export async function listTeacherEntries(teacherId: string) {
  const q = query(
    collection(db, 'entries'),
    where('teacherId', '==', teacherId),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}
