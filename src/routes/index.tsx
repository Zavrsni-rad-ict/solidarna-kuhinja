import { useRoutes } from 'react-router-dom';

import { adminRoutes, protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useUser } from '@/lib/auth';
import { useIsAdmin } from '@/hooks';
import { useEffect } from 'react';
import posthog from 'posthog-js';

export const AppRoutes = () => {
  const { data: user } = useUser();

  const isAdmin = useIsAdmin(user);

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...(isAdmin ? adminRoutes : [])]);

  useEffect(() => {
    if (user) {
      posthog.identify(String(user.id), {
        email: user.email,
        name: user.username,
      });
    }
  }, [user]);

  return <>{element}</>;
};
