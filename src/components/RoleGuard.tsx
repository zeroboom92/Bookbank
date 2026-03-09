'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getMyProfile } from '@/lib/auth';
import type { UserRole } from '@/types/models';

interface RoleGuardProps {
  role: UserRole;
  children: ReactNode;
}

export default function RoleGuard({ role, children }: RoleGuardProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const profile = await getMyProfile(user.uid);

      if (!profile || profile.role !== role) {
        router.replace('/login');
        return;
      }

      setReady(true);
    });
  }, [role, router]);

  if (!ready) {
    return <p className="p-6">인증 확인 중...</p>;
  }

  return <>{children}</>;
}
