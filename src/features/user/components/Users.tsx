import { Spinner } from '@/components/ui/spinner';
import { useFetchAllUsers } from '../api';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button, variants } from '@/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PADDING = 'p-5';

export const UserList = () => {
  const { data: users, isLoading: isLoadingUsers } = useFetchAllUsers();
  const { t: tG } = useTranslation('General');
  const { t: tUL } = useTranslation('UserList');

  const table = useReactTable({
    columns: [
      {
        accessorKey: 'id',
        header: () => 'ID',
        accessorFn: (user) => user.id,
        size: 50,
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
              <Button type="button" value={tG('delete')} variant="red" />
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
    <div className="p-6">
      <table className="w-full m-auto border-2 border-slate-300 rounded-lg">
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`py-3 gap-3 text-left ${PADDING}`}
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getAllColumns().length} className="p-10">
                {tG('no_data_available')}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={i % 2 === 0 ? 'bg-slate-200' : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={` ${PADDING}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <div className="my-4 flex justify-end">
        <Link to="/users/create" className={variants.primary}>
          {tUL('createButton')}
        </Link>
      </div>
    </div>
  );
};

UserList.displayName = 'UserList';
