import { RoleForm } from './form/RoleForm';
import { RoleRequest, useCreateRole } from '../api';
import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import { useSchema } from '../hooks';

export const CreateRole = () => {
  const { mutateAsync: createRoleAsync, status } = useCreateRole();

  const submitHandler = async (data: RoleRequest) => {
    await createRoleAsync(data);
  };

  const schema = useSchema();

  return (
    <FormWrapper schema={schema} submitHandler={submitHandler}>
      <RoleForm status={status} />
    </FormWrapper>
  );
};

CreateRole.displayName = 'CreateRole';
