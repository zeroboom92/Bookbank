'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyProfile, loginWithEmail } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const credential = await loginWithEmail(email, password);
      const profile = await getMyProfile(credential.user.uid);

      if (!profile) {
        setError('users 문서가 없습니다. README의 테스트 계정 생성 절차를 확인하세요.');
        return;
      }

      router.push(profile.role === 'teacher' ? '/teacher' : '/student');
    } catch (submitError) {
      setError('로그인에 실패했습니다.');
      console.error(submitError);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">로그인</h1>
      <form onSubmit={handleSubmit} className="space-y-3 rounded bg-white p-4 shadow">
        <input className="w-full rounded border p-2" type="email" placeholder="이메일" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <input className="w-full rounded border p-2" type="password" placeholder="비밀번호" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded bg-slate-900 p-2 text-white" type="submit">로그인</button>
      </form>
      <p className="mt-4 text-sm">
        교사 계정이 없다면 <Link href="/signup" className="underline">회원가입</Link>
      </p>
    </main>
  );
}
