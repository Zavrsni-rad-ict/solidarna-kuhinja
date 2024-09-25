import { Spinner } from '@/components/ui/spinner';
import { useDeleteUser } from '../api';
import { Table, variants } from '@/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTableUserConfig } from '@/features/role/hooks/useTableUserConfig';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';

export const UserList = () => {
  const { t: tUL } = useTranslation('UserList');
  const { mutate: deleteUser } = useDeleteUser();

  const { table, selectedUserId, isOpenModal, setIsOpenModal, isLoadingUsers } =
    useTableUserConfig();

  const handleClose = () => setIsOpenModal(false);

  const handleDelete = () => {
    deleteUser(selectedUserId);
    setIsOpenModal(false);
  };

  if (isLoadingUsers) return <Spinner />;

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        onClose={handleClose}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this role?"
      />

      <div className="p-6">
        <Table table={table} />

        <div className="my-4 flex justify-end">
          <Link to="/users/create" className={variants.primary}>
            {tUL('createButton')}
          </Link>
        </div>
      </div>
    </>
  );
};

UserList.displayName = 'UserList';
