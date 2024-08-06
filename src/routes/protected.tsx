import { MainLayout } from '@/components/Layout';
import { Profile } from '@/features/profile';
import { RoleList } from '@/features/role';
import { CreateUser, UserList, UpdateUser } from '@/features/user/components';

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
      { path: '', element: <>Home</> },
      { path: '/account', element: <Profile /> },
      {
        path: '/users',
        children: [
          { path: '', element: <UserList /> },
          { path: 'create', element: <CreateUser /> },
          { path: 'edit/:id', element: <UpdateUser /> },
        ],
      },
      {
        path: '/roles',
        children: [{ path: '', element: <RoleList /> }],
      },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];
