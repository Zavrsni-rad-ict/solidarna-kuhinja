import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useFetchRoles } from '../api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, variants } from '@/components';
import { useModal } from '@/hooks';
import { useState } from 'react';
import { useFetchAllUsers } from '@/features/user/api';

export const useTableUserConfig = () => {
  const { data: users } = useFetchAllUsers();

  const { t: tG } = useTranslation('General');
  const { t: tUL } = useTranslation('UserList');

  const [selectedUserId, setSelectedUserId] = useState(0);

  const { isOpenModal, setIsOpenModal } = useModal();

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

  return { table, isOpenModal, setIsOpenModal, selectedUserId };
};
