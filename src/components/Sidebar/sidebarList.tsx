import IconHome from '@/assets/home.svg?react';
import IconUsers from '@/assets/users.svg?react';
import IconUserRoles from '@/assets/user-role-svgrepo-com.svg?react';
import IconMap from '@/assets/map-icon.svg?react';
import { User } from '@/features/user/types';
import { RoleName } from '@/types';

type SidebarItem = {
  to: string;
  tabName: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  isVisible: (roleType: Lowercase<RoleName> | undefined) => boolean;
};

export const sidebarItems: SidebarItem[] = [
  {
    tabName: 'home',
    to: '/',
    Icon: IconHome,
    isVisible: () => true,
  },
  {
    tabName: 'users',
    to: '/users',
    Icon: IconUsers,
    isVisible: (roleType) => roleType === 'admin',
  },
  {
    tabName: 'roles',
    to: '/roles',
    Icon: IconUserRoles,
    isVisible: (roleType) => roleType === 'admin',
  },
  {
    tabName: 'Create Event',
    to: '/create-event',
    Icon: IconMap,
    isVisible: (roleType) => roleType === 'admin',
  },
  {
    tabName: 'List of Event',
    to: '/event',
    Icon: IconMap,
    isVisible: (roleType) => roleType === 'admin',
  },
];
