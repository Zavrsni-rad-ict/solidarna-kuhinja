import { MainLayout } from '@/components/Layout';
import { CreateEventView, EditEvent, EventList } from '@/features/create-event';
import { Home } from '@/features/home';
import { EditProfile, Profile } from '@/features/profile';
import { CreateUser, UserList, EditUser } from '@/features/user/components';

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
      { path: '/edit-profile', element: <EditProfile /> },
      { path: '*', element: <Navigate to="/" /> }, // ? TODO: This line should probbably be singled out and in the last place
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
          { path: 'edit/:id', element: <EditUser /> },
        ],
      },
      {
        path: '/create-event',
        element: <CreateEventView />,
      },
      {
        path: '/events',
        children: [
          {
            path: '',
            element: <EventList />,
          },
          {
            path: 'edit/:id',
            element: <EditEvent />,
          },
        ],
      },
    ],
  },
];
