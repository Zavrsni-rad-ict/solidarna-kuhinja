import { Spinner, CenteredLoadingSpinner } from '@/components/ui/spinner';
import { useDeleteUser } from '../api';
import { SearchBar, Table, variants } from '@/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTableUserConfig } from '@/features/role/hooks/useTableUserConfig';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import { RoleName } from '@/types';
import React from 'react';

export const UserList = () => {
  const { t: tUL } = useTranslation('UserList');
  const { t: tM } = useTranslation('Modal');

  const { mutate: deleteUser } = useDeleteUser();

  const {
    table,
    selectedUserId,
    isOpenModal,
    setIsOpenModal,
    isLoadingUsers,
    handleFindUser,
    userGroups,
    setCheckedRole,
    checkedRole,
    totalUsers,
  } = useTableUserConfig();

  const handleClose = () => setIsOpenModal(false);

  const handleDelete = () => {
    deleteUser(selectedUserId);
    setIsOpenModal(false);
  };

  if (isLoadingUsers) return <CenteredLoadingSpinner />;

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        onClose={handleClose}
        onConfirm={handleDelete}
        message={tM('userMessage')}
      />

      <div className="p-6">
        <div className="my-4 flex gap-4 flex-col-reverse sm:flex-row flex-wrap md:items-center">
          <SearchBar onChange={handleFindUser} />

          <div className="flex gap-2 flex-col sm:flex-row md:items-start lg:items-center">
            <div
              className="flex gap-2 items-center"
              onClick={() => setCheckedRole(null)}
            >
              <input
                id="all"
                type="radio"
                name="default-radio"
                value="All"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => setCheckedRole(null)}
                defaultChecked
              />
              <label
                htmlFor="all"
                className="capitalize text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All ({totalUsers})
              </label>
            </div>

            {Object.entries(userGroups).map(([roleName, userList]) => {
              return (
                <div
                  onClick={() => {
                    setCheckedRole(roleName as Lowercase<RoleName>);
                  }}
                  key={roleName}
                  className="flex gap-2 cursor-pointer items-center"
                >
                  <input
                    id={roleName}
                    type="radio"
                    name="default-radio"
                    checked={roleName === checkedRole}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />
                  <label
                    htmlFor={roleName}
                    className="capitalize text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                  >
                    {roleName} ({userList.length})
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <Table table={table} />

        <div className="my-4 flex justify-end">
          <Link to="/users/create" className={variants.primary}>
            {tUL('createButton')}
          </Link>
        </div>
      </div>
    </>
  );
};

UserList.displayName = 'UserList';
