import { Table } from '@/components';
import { useTableEventConfig } from '../hooks';
import { CenteredLoadingSpinner } from '@/components/ui/spinner';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import { useDeleteEvent } from '../api';
import { useState } from 'react';

export const EventList = () => {
  const {
    table,
    isLoadingEvents,
    isOpenModal,
    setIsOpenModal,
    selectedEventId,
  } = useTableEventConfig();

  const { mutate: deleteEvent } = useDeleteEvent();

  const handleConfirm = () => {
    deleteEvent(selectedEventId);
    setIsOpenModal(false);
  };

  const [expandRow, setExpandedRow] = useState<null | string>(null);

  if (isLoadingEvents) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        message="Da li ste sigurni da zelite da obrisete dogadjaj"
        onClose={() => setIsOpenModal(false)}
        onConfirm={handleConfirm}
      />
      <Table
        table={table}
        expandRow={expandRow}
        setExpandedRow={setExpandedRow}
      />
    </>
  );
};

EventList.displayName = 'EventList';
