'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '@/components/Header';
import RoleGuard from '@/components/RoleGuard';
import { auth } from '@/lib/firebase';
import { listTeacherEntries } from '@/lib/firestore';

interface EntryRow {
  id: string;
  studentRealName: string;
  title: string;
  review: string;
}

export default function TeacherPage() {
  const [entries, setEntries] = useState<EntryRow[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const rows = await listTeacherEntries(user.uid);
      setEntries(rows as EntryRow[]);
    });
  }, []);

  return (
    <RoleGuard role="teacher">
      <main className="mx-auto max-w-3xl p-6">
        <Header title="교사 페이지" />
        <section className="rounded bg-white p-4 shadow">
          <p className="mb-3 font-medium">최근 독서기록</p>
          <ul className="space-y-2">
            {entries.map((entry) => (
              <li key={entry.id} className="rounded border p-2">
                <p className="text-sm text-slate-500">학생: {entry.studentRealName}</p>
                <p className="font-medium">{entry.title}</p>
                <p className="text-sm text-slate-600">{entry.review}</p>
              </li>
            ))}
          </ul>
          {/* TODO: 집계/통계 캐시 추가 */}
        </section>
      </main>
    </RoleGuard>
  );
}
