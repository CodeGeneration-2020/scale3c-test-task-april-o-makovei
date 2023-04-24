import useAuth from '@/features/auth';
import { ROUTER_CONSTANTS } from '@/lib/router';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTER_CONSTANTS.DASHBOARD);
    }
  }, [isAuthenticated]);
  return null;
}
