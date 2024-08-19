import { Button, InputGroup } from '@/components';

import { Spinner } from '@/components/ui/spinner';
import { FormProps } from '@/types';

export const RoleForm = ({ status }: FormProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="max-w-[820px] w-full grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12">
          <InputGroup name="name" placeholder="Role Name" label="Role name" />
        </div>

        <div className="col-start-1 mt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? (
              <Spinner variant="light" size="md" />
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
