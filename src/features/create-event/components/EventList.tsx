import { Table } from '@/components';
import { useTableEventConfig } from '../hooks';
import { Spinner } from '@/components/ui/spinner';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import { useDeleteEvent } from '../api';

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

  if (isLoadingEvents) {
    return <Spinner />;
  }

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        message="Da li ste sigurni da zelite da obrisete dogadjaj"
        onClose={() => setIsOpenModal(false)}
        onConfirm={handleConfirm}
      />
      <Table table={table} />
    </>
  );
};

EventList.displayName = 'EventList';
