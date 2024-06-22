import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useUser } from '@/lib/auth';

export const AppRoutes = () => {
  const { data: user } = useUser();

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
