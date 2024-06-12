import { MainLayout } from '@/components/Layout';
import { Profile } from '@/features';
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
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];
