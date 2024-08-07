import { Button, InputGroup } from '@/components';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { Spinner } from '@/components/ui/spinner';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  role?: any;
  submitHandler: (data: any) => Promise<void>;
};

export const RoleForm = ({ submitHandler }: Props) => {
  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver({}) as any,
    shouldFocusError: false,
  });

  const { handleSubmit } = methods;

  // TODO: RoleRequest
  const onSubmit: SubmitHandler<any> = (data) => submitHandler(data);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') return handleSubmit(onSubmit);
  };

  return (
    <RHFFormProvider
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      methods={methods}
    >
      <div className="flex flex-wrap gap-4">
        <div className="max-w-[820px] w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12">
            <InputGroup
              name="roleName"
              placeholder="Role Name"
              label="Role name"
            />
          </div>

          <div className="col-start-1">
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
    </RHFFormProvider>
  );
};

RoleForm.displayName = 'RoleForm';
