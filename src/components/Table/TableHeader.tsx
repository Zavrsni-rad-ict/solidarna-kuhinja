import { SORT_ASC_SYMBOL, SORT_DESC_SYMBOL } from '@/constants';
import { Table as TableProps, flexRender } from '@tanstack/react-table';

type Props<T> = {
  table: TableProps<T>;
};

export const TableHeader = <T,>({ table }: Props<T>) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={`py-3 gap-3 text-left truncate p-5 ${
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
              }`}
              title={header.id}
              scope="col"
              onClick={header.column.getToggleSortingHandler()}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}

              {header.column.getCanSort() && (
                <span className="ml-2">
                  {header.column.getIsSorted() === 'asc' ? SORT_ASC_SYMBOL : ''}
                  {header.column.getIsSorted() === 'desc'
                    ? SORT_DESC_SYMBOL
                    : ''}
                </span>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

TableHeader.displayName = 'TableHeader';
