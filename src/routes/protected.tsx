import { MainLayout } from '@/components/Layout';
import { Profile } from '@/features/profile';
import { UserList } from '@/features/user/components';

import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/account', element: <Profile /> },
      { path: '/users', element: <UserList /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];
