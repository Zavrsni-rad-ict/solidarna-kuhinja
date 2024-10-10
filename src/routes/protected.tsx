import { MainLayout } from '@/components/Layout';
import { CreateEventView } from '@/features/create-event';
import { Home } from '@/features/home';
import { Profile } from '@/features/profile';
import { CreateRole, EditRole, RoleList } from '@/features/role';
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
      { path: '', element: <Home /> },
      { path: '/account', element: <Profile /> },
      { path: '*', element: <Navigate to="/" /> }, // TODO: This line should probbably be singled out and in the last place
    ],
  },
];

export const adminRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/users',
        children: [
          { path: '', element: <UserList /> },
          { path: 'create', element: <CreateUser /> },
          { path: 'edit/:id', element: <UpdateUser /> }, // TODO: Rename this component to EditUser
        ],
      },
      {
        path: '/roles',
        children: [
          { path: '', element: <RoleList /> },
          { path: 'create', element: <CreateRole /> },
          { path: 'edit/:id', element: <EditRole /> },
        ],
      },
      {
        path: '/create-event',
        element: <CreateEventView />,
      },
      {
        path: '/event',
        element: <>EVENT VIEW</>,
      },
    ],
  },
];
