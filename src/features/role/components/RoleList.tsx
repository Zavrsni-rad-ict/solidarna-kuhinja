import { Table, variants } from '@/components';

import { useTableRoleConfig } from '../hooks';
import { Link } from 'react-router-dom';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/ui/spinner';

export const RoleList = () => {
  const { t: tRL } = useTranslation('RoleList');
  const { table, isOpenModal, setIsOpenModal, isLoading } =
    useTableRoleConfig();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => {}}
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
    </div>
  );
};

RoleList.displayName = 'RoleList';
