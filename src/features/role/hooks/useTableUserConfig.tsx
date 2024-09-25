import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, variants } from '@/components';
import { useModal } from '@/hooks';
import { useState } from 'react';
import { useFetchAllUsers } from '@/features/user/api';
import { useDebounce } from '@/features/user/hooks';
import { DEBOUNCE_DELAY } from '@/constants';

export const useTableUserConfig = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [searchState, setSearchState] = useState('');
  const debouncedSearchTerm = useDebounce(searchState, DEBOUNCE_DELAY);

  const { data: users, isLoading: isLoadingUsers } = useFetchAllUsers({
    pageNumber: pagination.pageIndex + 1, // Because for endpoint doesn't exist pageNumber 0
    pageSize: pagination.pageSize,
    search: debouncedSearchTerm,
  });

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
    data: users?.data ?? [],
    pageCount: users?.meta.pagination.pageCount,
    manualPagination: true,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      let newPagination;

      if (typeof updater === 'function') {
        newPagination = updater(table.getState().pagination);
      } else {
        newPagination = updater;
      }

      setPagination(newPagination);
    },
  });

  const handleFindUser = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    setSearchState(newValue);
  };

  console.log({ debouncedSearchTerm });
  return {
    table,
    isOpenModal,
    setIsOpenModal,
    selectedUserId,
    isLoadingUsers,
    handleFindUser,
  };
};
