import { Modal, Table } from '@/components';
import React from 'react';
import { useTableEventConfig } from '../hooks';
import { Spinner } from '@/components/ui/spinner';

export const EventList = () => {
  const { table, isLoadingEvents, isOpenModal, setIsOpenModal } =
    useTableEventConfig();

  if (isLoadingEvents) {
    return <Spinner />;
  }
  return (
    <>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <h1>Modal test</h1>
      </Modal>
      <Table table={table} />
    </>
  );
};

EventList.displayName = 'EventList';
