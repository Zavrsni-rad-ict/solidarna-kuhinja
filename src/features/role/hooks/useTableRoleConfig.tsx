import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useFetchRoles } from '../api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, variants } from '@/components';
import { useModal } from '@/hooks';
import { useState } from 'react';

export const useTableRoleConfig = () => {
  const { data } = useFetchRoles();
  const roles = data?.roles;

  const { t: tG } = useTranslation('General');
  const { t: tRL } = useTranslation('RoleList');
  // TODO - Kada budem brisao rolu koristicu selectedRoleId
  const [selectedRoleId, setSelectedRoleId] = useState(0);

  const { isOpenModal, setIsOpenModal } = useModal();

  const ascedentSortRoles = roles?.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );

  const table = useReactTable({
    columns: [
      {
        accessorKey: 'id',
        header: () => 'ID',
        accessorFn: (role) => role.id,
        size: 50,
      },
      {
        accessorKey: 'name',
        header: () => tRL('roleName'),
        accessorFn: (role) => role.name,
        size: 50,
      },
      {
        accessorKey: 'actions',
        header: () => tG('actions'),
        size: 50,
        cell: (props) => {
          const role = props.row.original;
          return (
            <div className="flex gap-2">
              <Link to={`/roles/edit/${role.id}`} className={variants.yellow}>
                {tG('edit')}
              </Link>
              <Button
                type="button"
                onClick={() => {
                  setIsOpenModal(true);
                  setSelectedRoleId(role.id);
                }}
                className={`${
                  role.type === 'admin' ? variants.disabled : variants.red
                }`}
                disabled={role.type === 'admin'}
                title={
                  role.type === 'admin' ? 'Cannot delete admin' : undefined
                }
              >
                {tG('delete')}
              </Button>
            </div>
          );
        },
      },
    ],
    data: ascedentSortRoles ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isOpenModal, setIsOpenModal };
};
