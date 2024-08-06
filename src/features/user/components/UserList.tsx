import { Spinner } from '@/components/ui/spinner';
import { useDeleteUser, useFetchAllUsers } from '../api';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button, Modal, Table, variants } from '@/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useModal } from '@/hooks/useModal';

import IconInfo from '@/assets/info.svg?react';
import { useState } from 'react';

export const UserList = () => {
  const { data: users, isLoading: isLoadingUsers } = useFetchAllUsers();
  const { t: tG } = useTranslation('General');
  const { t: tUL } = useTranslation('UserList');
  const { isOpenModal, setIsOpenModal } = useModal();
  const { mutate: deleteUser } = useDeleteUser();
  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleDelete = () => {
    deleteUser(selectedUserId);
    setIsOpenModal(false);
  };

  const table = useReactTable({
    columns: [
      {
        accessorKey: 'id',
        header: () => 'ID',
        accessorFn: (user) => user.id,
        size: 50,
      },
      {
        accessorKey: 'firstName',
        header: () => tUL('columns.firstName'),
        accessorFn: (user) => user.firstName,
      },
      {
        accessorKey: 'lastName',
        header: () => tUL('columns.lastName'),
        accessorFn: (user) => user.lastName,
      },
      {
        accessorKey: 'username',
        header: () => tUL('columns.username'),
        accessorFn: (user) => user.username,
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
        accessorFn: (user) => user.email,
      },
      {
        accessorKey: 'actions',
        header: () => tG('actions'),
        cell: (props) => {
          const user = props.row.original;
          return (
            <div className="flex gap-2">
              <Link to={`/users/edit/${user.id}`} className={variants.yellow}>
                {tG('edit')}
              </Link>
              <Button
                type="button"
                onClick={() => {
                  setIsOpenModal(true);
                  setSelectedUserId(user.id);
                }}
                className={`${
                  user.username === 'admin' || String(user.id) === '2'
                    ? variants.disabled
                    : variants.red
                }`}
                disabled={user.username === 'admin' || String(user.id) === '2'}
                title={
                  user.username === 'admin' || String(user.id) === '2'
                    ? 'Cannot delete admin'
                    : undefined
                }
              >
                {tG('delete')}
              </Button>
            </div>
          );
        },
      },
    ],
    data: users ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoadingUsers) return <Spinner />;

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="p-4 md:p-5 text-center">
          <IconInfo width={64} />;
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this user?
          </h3>
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            onClick={handleDelete}
          >
            Yes, I'm sure
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => setIsOpenModal(false)}
          >
            No, cancel
          </button>
        </div>
      </Modal>
      <div className="p-6">
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
