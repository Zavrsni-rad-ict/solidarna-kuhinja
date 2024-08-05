import { MainLayout } from '@/components/Layout';
import { Profile } from '@/features/profile';
import { CreateUser, UserList } from '@/features/user/components';
import { EditUser } from '@/features/user/components/EditUser';

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
      {
        path: '/users',
        children: [
          { path: '', element: <UserList /> },
          { path: 'create', element: <CreateUser /> },
          { path: 'edit/:id', element: <EditUser /> },
        ],
      },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];
