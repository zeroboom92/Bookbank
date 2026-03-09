'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '@/components/Header';
import RoleGuard from '@/components/RoleGuard';
import { auth } from '@/lib/firebase';
import { listStudentEntries } from '@/lib/firestore';

interface EntryRow {
  id: string;
  title: string;
  review: string;
}

export default function StudentPage() {
  const [entries, setEntries] = useState<EntryRow[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const rows = await listStudentEntries(user.uid);
      setEntries(rows as EntryRow[]);
    });
  }, []);

  return (
    <RoleGuard role="student">
      <main className="mx-auto max-w-3xl p-6">
        <Header title="학생 페이지" />
        <section className="rounded bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium">내 독서기록 목록</p>
            <Link href="/student/new" className="inline-block rounded bg-slate-900 px-4 py-2 text-white">
              기록 추가
            </Link>
          </div>
          <ul className="space-y-2">
            {entries.map((entry) => (
              <li key={entry.id} className="rounded border p-2">
                <p className="font-medium">{entry.title}</p>
                <p className="text-sm text-slate-600">{entry.review}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </RoleGuard>
  );
}
