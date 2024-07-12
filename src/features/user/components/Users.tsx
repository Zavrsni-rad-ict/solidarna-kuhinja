import { Spinner } from '@/components/ui/spinner';
import { useFetchAllUsers } from '../api';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components';

export const Users = () => {
  const { data: users, isLoading: isLoadingUsers } = useFetchAllUsers();

  const table = useReactTable({
    columns: [
      {
        accessorKey: 'id',
        header: () => 'ID',
        accessorFn: (user) => user.id,
      },
      {
        accessorKey: 'username',
        header: () => 'Username',
        accessorFn: (user) => user.username,
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
        accessorFn: (user) => user.email,
      },
      {
        accessorKey: 'actions',
        header: () => 'Actions',
        cell: () => (
          <>
            <Button type="button" value="Edit" variant="yellow" />
            <Button type="button" value="Delete" variant="red" />
          </>
        ),
      },
    ],
    data: users ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoadingUsers) return <Spinner />;

  return (
    <div className="p-6">
      <table className="max-w-[1024px] w-full m-auto">
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 gap-3 text-left">
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
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className={i % 2 === 0 ? 'bg-slate-200' : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
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
    </div>
  );
};

Users.displayName = 'Users';
