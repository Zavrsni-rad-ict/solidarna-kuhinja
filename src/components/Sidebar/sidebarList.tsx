import IconHome from '@/assets/home.svg?react';
import IconUsers from '@/assets/users.svg?react';
import IconUserRoles from '@/assets/user-role-svgrepo-com.svg?react';
import IconMap from '@/assets/map-icon.svg?react';

type SidebarItem = {
  to: string;
  tabName: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export const sidebarItems: SidebarItem[] = [
  {
    tabName: 'home',
    to: '/',
    Icon: IconHome,
  },
  {
    tabName: 'users',
    to: '/users',
    Icon: IconUsers,
  },
  {
    tabName: 'roles',
    to: '/roles',
    Icon: IconUserRoles,
  },
  {
    tabName: 'Create Event',
    to: '/create-event',
    Icon: IconMap,
  },
];
