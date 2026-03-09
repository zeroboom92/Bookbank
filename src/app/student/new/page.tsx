'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createEntry } from '@/lib/firestore';
import { getMyProfile } from '@/lib/auth';

export default function NewEntryPage() {
  const router = useRouter();
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (review.length > 100) {
      setError('소감은 100자 이내로 작성해주세요.');
      return;
    }

    const user = await new Promise<import('firebase/auth').User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        unsubscribe();
        resolve(currentUser);
      });
    });

    if (!user) {
      router.push('/login');
      return;
    }

    const profile = await getMyProfile(user.uid);

    if (!profile || profile.role !== 'student' || !profile.realName || !profile.teacherId) {
      setError('학생 프로필(실명/teacherId)이 올바르지 않습니다.');
      return;
    }

    try {
      await createEntry({
        teacherId: profile.teacherId,
        studentUid: user.uid,
        studentRealName: profile.realName,
        bookId,
        title,
        coverUrl,
        review
      });
      router.push('/student');
    } catch (submitError) {
      console.error(submitError);
      setError('이미 저장한 책입니다.');
    }
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-xl font-semibold">독서기록 추가</h1>
      <form onSubmit={handleSubmit} className="space-y-3 rounded bg-white p-4 shadow">
        <input className="w-full rounded border p-2" placeholder="bookId" value={bookId} onChange={(event) => setBookId(event.target.value)} required />
        <input className="w-full rounded border p-2" placeholder="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
        <input className="w-full rounded border p-2" placeholder="coverUrl (선택)" value={coverUrl} onChange={(event) => setCoverUrl(event.target.value)} />
        <textarea className="w-full rounded border p-2" placeholder="소감 (100자 이내)" value={review} maxLength={100} onChange={(event) => setReview(event.target.value)} />
        <p className="text-xs text-slate-500">{review.length}/100</p>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">저장</button>
      </form>
      {/* TODO: Google Books API 검색 UI로 대체 */}
    </main>
  );
}
