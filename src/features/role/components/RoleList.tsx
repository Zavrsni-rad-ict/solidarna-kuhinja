import { Modal, Table, variants } from '@/components';

import { useTableRoleConfig } from '../hooks';
import IconInfo from '@/assets/info.svg?react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

      <Table table={table} />

      <div className="my-4 flex justify-end">
        <Link to="/roles/create" className={variants.primary}>
          {/* {tUL('createButton')} */}Kreiraj Ulogu
        </Link>
      </div>
    </div>
  );
};

RoleList.displayName = 'RoleList';
