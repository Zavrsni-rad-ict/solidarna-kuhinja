import { Button, InputGroup } from '@/components';

import { Spinner } from '@/components/ui/spinner';
import { FormProps, SingleRole } from '@/types';

import { PermissionList } from '../PermissionList';

type Props = FormProps & {
  role?: SingleRole;
};

export const RoleForm = ({ status, role }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="max-w-[820px] w-full grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12">
          <InputGroup name="name" placeholder="Role Name" label="Role name" />
        </div>

        <PermissionList role={role} />

        <div className="col-start-1 mt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? (
              <Spinner variant="light" size="md" />
            ) : role ? (
              'Update'
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

RoleForm.displayName = 'RoleForm';
