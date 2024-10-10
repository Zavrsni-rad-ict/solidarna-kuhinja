import { Table } from '@/components';
import React from 'react';
import { useTableEventConfig } from '../hooks';
import { Spinner } from '@/components/ui/spinner';

export const EventList = () => {
  const { table, isLoadingEvents } = useTableEventConfig();

  if (isLoadingEvents) {
    return <Spinner />;
  }
  return <Table table={table} />;
};

EventList.displayName = 'EventList';
