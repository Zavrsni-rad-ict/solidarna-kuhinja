import { useParams } from 'react-router-dom';
import { useSchema } from '../hooks';
import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import { RoleForm } from './form/RoleForm';
import { RoleRequest, useFetchRole, useUpdateRole } from '../api';

export const EditRole = () => {
  const { mutate: updateRole, status } = useUpdateRole();
  const { id } = useParams<{ id: string }>();

  const schema = useSchema();

  const submitHandler = async ({ name }: RoleRequest) => {
    await updateRole({ name, id: Number(id) });
  };

  const { data: role, isLoading } = useFetchRole(Number(id));

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const formData = {
    name: role!.name,
  };

  return (
    <FormWrapper
      schema={schema}
      submitHandler={submitHandler}
      defaultValues={formData}
    >
      <RoleForm status={status} role={role} />
    </FormWrapper>
  );
};

EditRole.displayName = 'EditRole';
