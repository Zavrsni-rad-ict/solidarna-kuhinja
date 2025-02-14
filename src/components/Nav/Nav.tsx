import React from 'react';
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react';
import { Cog6ToothIcon, PowerIcon } from '@heroicons/react/24/solid';
import { useLogout } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

import logoPath from '@/assets/logo-white.png';
import { ICON_SIZE } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useFeatureFlags } from '@/hooks';
import { IconHamburger } from '../IconHamburger/IconHamburger';

function ProfileMenu() {
  const { t } = useTranslation('General');
  const profileMenuItems = [
    {
      label: `${t('edit')} ${t('profile')}`,
      icon: Cog6ToothIcon,
      path: '/edit-profile',
    },
    {
      label: t('sign_out'),
      icon: PowerIcon,
      path: '/sign-out',
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => navigate(path);

  const uploadImageFF = useFeatureFlags('uploadImageFF');

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center justify-center gap-1 rounded-full lg:ml-auto w-[64px] h-[64px]"
        >
          {uploadImageFF ? (
            <Avatar
              width={64}
              height={64}
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5 rounded-full"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          ) : (
            <IconHamburger />
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-1 z-[100001]">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <div
              key={label}
              onClick={isLastItem ? logout : () => handleNavigate(path)}
            >
              <MenuItem
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded py-2 ${
                  isLastItem
                    ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                    : 'hover:bg-slate-500/10'
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? 'red' : 'inherit'}
                >
                  {label}
                </Typography>
              </MenuItem>
            </div>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export const Nav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <Navbar className="p-2 lg:pl-6 bg-red-600 border-none">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <img src={logoPath} alt="Logo" width={ICON_SIZE['3xl']} />
        <div className="hidden lg:block">{/* <NavList /> */}</div>

        <ProfileMenu />
      </div>
    </Navbar>
  );
};
