import { UserRequest, useCreateUser } from '../api';
import { UserForm } from './form/UserForm';

export const CreateUser = () => {
  const { mutateAsync: createUserAsync, status } = useCreateUser();

  const submitHandler = async (data: UserRequest) => {
    await createUserAsync(data);
  };

  return (
    <UserForm
      submitHandler={submitHandler}
      isSubmitted={status === 'pending'}
      shouldShowRoleInput
    />
  );
};

CreateUser.displayName = 'CreateUser';
