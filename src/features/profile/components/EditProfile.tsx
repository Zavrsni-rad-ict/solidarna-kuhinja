import { useFetchLanguages } from '@/api/useFetchLanguages';
import { variants } from '@/components';
import { UserRequest, useUpdateUser } from '@/features/user/api';
import { UserForm } from '@/features/user/components/form/UserForm';
import { useUser } from '@/lib/auth';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from '@material-tailwind/react';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const EditProfile = () => {
  const { data: languages } = useFetchLanguages();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const { t } = useTranslation('EditProfile');

  const { i18n } = useTranslation();
  const handleChangeLanguage = (
    e: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLLIElement>,
  ) => {
    i18n.changeLanguage(e.currentTarget.value);
    toast.success(t('languageChangeSuccess'));
  };

  const { data: user } = useUser();
  const { mutateAsync: updateUserAsync, status: updateUserStatus } =
    useUpdateUser();

  const submitHandler = async (data: UserRequest) => {
    await updateUserAsync({ ...data, id: user?.id! });
  };

  const formData: UserRequest | undefined = useMemo(
    () =>
      user && {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        blocked: user.blocked,
      },
    [user],
  )!;

  return (
    <div className="relative mx-auto flex flex-col items-baseline justify-between text-blue-gray-900">
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button variant="text" className={variants.red}>
            {t('chooseLanguage')}
          </Button>
        </MenuHandler>
        <MenuList className="p-1 z-[100001]" onClick={closeMenu}>
          {languages?.map((language) => (
            <MenuItem
              value={language.code}
              key={language.id}
              className="hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              onClick={handleChangeLanguage}
            >
              {language.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <UserForm
        submitHandler={submitHandler}
        user={formData}
        isSubmitted={updateUserStatus === 'pending'}
      />
    </div>
  );
};

EditProfile.displayName = 'EditProfile';
