import { Table as TableProps, flexRender } from '@tanstack/react-table';
type Props<T> = {
  table: TableProps<T>;
};

export const TableFooter = <T,>({ table }: Props<T>) => {
  return (
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
  );
};

TableFooter.displayName = 'TableFooter';
