import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useFetchRoles } from '../api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, variants } from '@/components';
import { useModal } from '@/hooks';
import { useMemo, useState } from 'react';

export const useTableRoleConfig = () => {
  const { data, isLoading } = useFetchRoles();
  const roles = data?.roles;

  const { t: tG } = useTranslation('General');
  const { t: tRL } = useTranslation('RoleList');

  const [selectedRoleId, setSelectedRoleId] = useState(0);

  const { isOpenModal, setIsOpenModal } = useModal();

  const ascedentSortRoles = useMemo(
    () => roles?.toSorted((a, b) => a.name.localeCompare(b.name)),
    [roles],
  );

  const handleDeleteClick = (roleId: number) => {
    setIsOpenModal(true);
    setSelectedRoleId(roleId);
  };

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

          const isAdmin = role.type === 'admin';

          return (
            <div className="flex gap-2">
              <Link
                to={isAdmin ? '' : `/roles/edit/${role.id}`}
                className={isAdmin ? variants.disabled : variants.yellow}
              >
                {tG('edit')}
              </Link>
              <Button
                type="button"
                onClick={() => handleDeleteClick(role.id)}
                className={`${isAdmin ? variants.disabled : variants.red}`}
                disabled={isAdmin}
                title={isAdmin ? 'Cannot delete admin' : undefined}
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

  return { table, isOpenModal, setIsOpenModal, isLoading, selectedRoleId };
};
