import { Table, variants } from '@/components';

import { useTableRoleConfig } from '../hooks';
import { Link } from 'react-router-dom';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteRole } from '../api';
import { useCallback } from 'react';

export const RoleList = () => {
  const { t: tRL } = useTranslation('RoleList');
  const { table, isOpenModal, setIsOpenModal, isLoading, selectedRoleId } =
    useTableRoleConfig();

  const { mutate: deleteRole } = useDeleteRole();
  const handleClose = useCallback(() => setIsOpenModal(false), []);
  const handleConfirm = useCallback(
    () => deleteRole(selectedRoleId),
    [selectedRoleId],
  );

  if (isLoading) return <Spinner />;

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message="Are you sure you want to delete this role?"
      />
      <div className="p-6">
        <Table table={table} />

        <div className="my-4 flex justify-end">
          <Link to="/roles/create" className={variants.primary}>
            {tRL('createButton')}
          </Link>
        </div>
      </div>
    </>
  );
};

RoleList.displayName = 'RoleList';
