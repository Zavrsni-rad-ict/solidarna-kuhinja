import { CenteredLoadingSpinner } from '@/components/ui/spinner';
import { useDeleteUser } from '../api';
import { SearchBar, Table, variants } from '@/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTableUserConfig } from '@/features/role/hooks/useTableUserConfig';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import { RoleRadioGroup } from './RoleRadioGroup';

export const UserList = () => {
  const { t: tUL } = useTranslation('UserList');
  const { t: tM } = useTranslation('Modal');

  const { mutate: deleteUser } = useDeleteUser();

  const {
    table,
    selectedUserId,
    isOpenModal,
    setIsOpenModal,
    isLoadingUsers,
    handleFindUser,
    userGroups,
    setCheckedRole,
    checkedRole,
    totalUsers,
    isFetchingUser,
  } = useTableUserConfig();

  const handleClose = () => setIsOpenModal(false);

  const handleDelete = () => {
    deleteUser(selectedUserId);
    setIsOpenModal(false);
  };

  if (isLoadingUsers) return <CenteredLoadingSpinner />;

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isOpenModal}
        onClose={handleClose}
        onConfirm={handleDelete}
        message={tM('userMessage')}
      />

      <div className="p-6">
        <div className="my-4 flex gap-4 flex-col-reverse sm:flex-row flex-wrap md:items-center">
          <SearchBar onChange={handleFindUser} />
          <RoleRadioGroup
            userGroups={userGroups}
            checkedRole={checkedRole}
            setCheckedRole={setCheckedRole}
            totalUsers={totalUsers}
          />
        </div>
        <Table table={table} isFetching={isFetchingUser} />

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
