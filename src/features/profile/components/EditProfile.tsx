import { useFetchLanguages } from '@/api/useFetchLanguages';
import { variants } from '@/components';
// import { Button } from '@/components';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const EditProfile = () => {
  const { data: languages } = useFetchLanguages();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const { i18n } = useTranslation();
  const handleChangeLanguage = (
    e: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLLIElement>,
  ) => {
    i18n.changeLanguage(e.currentTarget.value);
    toast.success('Uspesno si promeni jezik');
  };

  return (
    <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button variant="text" className={variants.red}>
            Choose language - HC
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
    </div>
  );
};

EditProfile.displayName = 'EditProfile';
