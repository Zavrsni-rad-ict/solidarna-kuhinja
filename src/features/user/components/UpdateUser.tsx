import { useParams } from 'react-router-dom';
import { UserForm } from './form/UserForm';
import { UserRequest, useFetchUser, useUpdateUser } from '../api';
import { useMemo } from 'react';

export const EditUser = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user } = useFetchUser(Number(id));

  const { mutateAsync: updateUserAsync } = useUpdateUser();

  const submitHandler = async (data: UserRequest) => {
    await updateUserAsync({ ...data, id: user?.id! });
  };

  const formData: UserRequest | undefined = useMemo(
    () =>
      user && {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role: user.role.id,
        username: user.username,
        blocked: user.blocked,
      },
    [user],
  );

  return formData && <UserForm user={formData} submitHandler={submitHandler} />;
};

EditUser.displayName = 'EditUser';
