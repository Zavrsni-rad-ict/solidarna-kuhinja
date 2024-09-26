import { useRoutes } from 'react-router-dom';

import { adminRoutes, protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useUser } from '@/lib/auth';
import { useIsAdmin } from '@/hooks';

export const AppRoutes = () => {
  const { data: user } = useUser();

  const isAdmin = useIsAdmin(user);

  const routes = user ? protectedRoutes : publicRoutes;

  console.log(isAdmin);
  const element = useRoutes([...routes, ...(isAdmin ? adminRoutes : [])]);

  return <>{element}</>;
};
