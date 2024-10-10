import { variants } from '@/components';
import { nullValueText } from '@/constants';
import { useFetchEvents } from '@/features/home';
import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const useTableEventConfig = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: events, isLoading: isLoadingEvents } = useFetchEvents({
    refetchOnMount: 'always',
  });
  const { t: tG } = useTranslation('General');

  console.log(events);

  const sortEventsByDateAsc = events?.data.toSorted(
    (a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime(),
  );

  const table = useReactTable({
    columns: [
      {
        accessorKey: 'id',
        header: () => 'ID',
        accessorFn: (event) => event.id,
        size: 50,
      },
      {
        accessorKey: 'locationName',
        header: () => 'Location Name',
        accessorFn: (event) => event.attributes.locationName,
        size: 120,
      },
      {
        accessorKey: 'date',
        header: () => 'Date',
        accessorFn: (event) =>
          moment(event.attributes.date).format('D.MM.YYYY.'),
        size: 120,
      },
      {
        accessorKey: 'chefs',
        header: () => 'Chefs',
        accessorFn: (event) =>
          `${event.attributes.signedUpChefs ?? nullValueText} / ${event.attributes.numberOfCooks}`,
        size: 60,
      },
      {
        accessorKey: 'deliverer',
        header: () => 'Deliverer',
        accessorFn: (event) =>
          `${event.attributes.signedUpDeliverer ?? nullValueText} / ${event.attributes.numberOfDeliveryPerson}`,
        size: 60,
      },

      {
        accessorKey: 'fieldWorkers',
        header: () => 'Field Workers',
        accessorFn: (event) =>
          `${event.attributes.signedUpFieldWorkers ?? nullValueText} / ${event.attributes.numberOfFieldWorkers}`,
        size: 60,
      },
    ],
    data: sortEventsByDateAsc ?? [],
    pageCount: events?.meta.pageCount,
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

  return {
    table,
    isLoadingEvents,
  };
};
