'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="mb-4 flex items-center justify-between rounded bg-white p-4 shadow">
      <h1 className="text-xl font-semibold">{title}</h1>
      <button onClick={onLogout} className="rounded border px-3 py-1 text-sm">
        로그아웃
      </button>
    </header>
  );
}
