import IconHome from '@/assets/home.svg?react';
import IconUsers from '@/assets/users.svg?react';
import IconMap from '@/assets/map-icon.svg?react';
import { RoleName } from '@/types';
import { useTranslation } from 'react-i18next';

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

export const useSidebarList = (): SidebarItem[] => {
  const { t: tS } = useTranslation('Sidebar');

  return [
    {
      tabName: tS('home'),
      to: '/',
      Icon: IconHome,
      isVisible: () => true,
    },
    {
      tabName: tS('users'),
      to: '/users',
      Icon: IconUsers,
      isVisible: (roleType) => roleType === 'admin',
    },
    {
      tabName: tS('createEvent'),
      to: '/create-event',
      Icon: IconMap,
      isVisible: (roleType) => roleType === 'admin',
    },
    {
      tabName: tS('listOfEvents'),
      to: '/events',
      Icon: IconMap,
      isVisible: (roleType) => roleType === 'admin',
    },
  ];
};
