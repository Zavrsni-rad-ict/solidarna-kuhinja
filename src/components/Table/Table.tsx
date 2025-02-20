import { Table as TableProps, flexRender } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { PaginationControl } from '../PaginationControl/PaginationControl';
import { nullValueText } from '@/constants';
import { User } from '@/features/user/types';
import { generateSerbianPhoneNumber } from '@/utils';
import { Skeleton } from '../Skeleton/Skeleton';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';

type Props<T> = {
  table: TableProps<T>;
  shouldShowFooter?: boolean;
  expandRow?: string | null;
  setExpandedRow?: (rowId: string | null) => void;
  isFetching?: boolean;
};

export const Table = <T,>({
  table,
  shouldShowFooter = false,
  expandRow,
  setExpandedRow,
  isFetching,
}: Props<T>) => {
  const { t: tG } = useTranslation('General');

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader table={table} />
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getAllColumns().length} className="p-10">
                {tG('no_data_available')}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, i) => (
              <>
                <tr
                  key={row.id}
                  className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-gray-900 ${
                    typeof setExpandedRow === 'function'
                      ? 'hover:bg-gray-200 cursor-pointer'
                      : ''
                  }`}
                  onClick={() => {
                    if (typeof setExpandedRow === 'undefined') return;

                    if (expandRow === row.id) return setExpandedRow(null);

                    setExpandedRow(row.id);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`truncate p-5`}
                      title={cell.getValue() as string}
                    >
                      {isFetching ? (
                        <Skeleton />
                      ) : cell.getValue() || cell.column.id === 'actions' ? (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      ) : (
                        nullValueText
                      )}
                    </td>
                  ))}
                </tr>
                {expandRow === row.id && (
                  // @ts-expect-error Property 'attributes' does not exist on type 'T'
                  <ExpandableRow users={row.original.attributes?.users?.data} />
                )}
              </>
            ))
          )}
        </tbody>
        {shouldShowFooter && <TableFooter table={table} />}
      </table>

      <PaginationControl table={table} />
    </div>
  );
};

const ExpandableRow = ({ users }: { users: User[] }) => {
  return users?.length > 0
    ? // @ts-expect-error attributes
      users.map(({ attributes: user }, userIndex) => (
        <tr key={userIndex} className="bg-gray-100">
          <td className="p-4">
            <div>
              <strong>Index:</strong> {userIndex + 1}
            </div>
          </td>
          <td className="p-4">
            <div>
              <strong>Username:</strong> {user.username}
            </div>
          </td>
          <td className="p-4">
            <div>
              <strong>FirstName:</strong> {user.firstName}
            </div>
          </td>
          <td className="p-4">
            <div>
              <strong>LastName:</strong> {user.lastName}
            </div>
          </td>
          <td className="p-4">
            <div>
              <strong>Phone number:</strong> {generateSerbianPhoneNumber()}
            </div>
          </td>
          <td className="p-4" colSpan={3}>
            <div>
              <strong>Role:</strong> {user.role.data.attributes.name}
            </div>
          </td>
        </tr>
      ))
    : null;
};

Table.displayName = 'Table';
