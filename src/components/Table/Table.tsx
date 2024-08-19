import { Table as TableProps, flexRender } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

type Props<T> = {
  table: TableProps<T>;
};

const PADDING = 'p-5';

export const Table = <T,>({ table }: Props<T>) => {
  const { t: tG } = useTranslation('General');

  return (
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
                  {cell.getValue() || cell.column.id === 'actions'
                    ? flexRender(cell.column.columnDef.cell, cell.getContext())
                    : '--'}
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
  );
};

Table.displayName = 'Table';
