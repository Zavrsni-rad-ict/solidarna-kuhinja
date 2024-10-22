import { Table } from '@tanstack/react-table';

const disabledClassName = 'cursor-not-allowed bg-gray-200 text-gray-400';
const enableClassName = 'hover:bg-gray-100';

export const PaginationControl = <T,>({ table }: { table: Table<T> }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 m-3 justify-between">
      <div className="pagination flex gap-2">
        <button
          className={`border rounded p-1 ${
            !table.getCanPreviousPage() ? disabledClassName : enableClassName
          }`}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className={`border rounded p-1 ${
            !table.getCanPreviousPage() ? disabledClassName : enableClassName
          }`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className={`border rounded p-1 ${
            !table.getCanNextPage() ? disabledClassName : enableClassName
          }`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className={`border rounded p-1 ${
            !table.getCanNextPage() ? disabledClassName : enableClassName
          }`}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        {table.getPageCount() > 0 && (
          <div className="flex items-center gap-1">
            <span>Page</span>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </div>
        )}
      </div>

      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="cursor-pointer bg-transparent"
      >
        {[5, 10, 15].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

PaginationControl.displayName = 'PaginationControl';
