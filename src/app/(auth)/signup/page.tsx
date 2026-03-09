'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupTeacher } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await signupTeacher(email, password, teacherName);
      router.push('/teacher');
    } catch (submitError) {
      setError('회원가입에 실패했습니다. 입력값을 확인해주세요.');
      console.error(submitError);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">교사 회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-3 rounded bg-white p-4 shadow">
        <input className="w-full rounded border p-2" placeholder="교사 이름" value={teacherName} onChange={(event) => setTeacherName(event.target.value)} required />
        <input className="w-full rounded border p-2" type="email" placeholder="이메일" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <input className="w-full rounded border p-2" type="password" placeholder="비밀번호" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded bg-slate-900 p-2 text-white" type="submit">가입하기</button>
      </form>
    </main>
  );
}
