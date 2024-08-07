import { Table, variants } from '@/components';

import { useTableRoleConfig } from '../hooks';
import { Link } from 'react-router-dom';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';

export const RoleList = () => {
  const { table, isOpenModal, setIsOpenModal } = useTableRoleConfig();

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
            {/* {tUL('createButton')} */}Kreiraj Ulogu
          </Link>
        </div>
      </div>
    </div>
  );
};

RoleList.displayName = 'RoleList';
