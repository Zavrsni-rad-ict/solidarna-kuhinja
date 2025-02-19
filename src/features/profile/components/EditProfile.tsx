import { UserRequest, useUpdateUser } from '@/features/user/api';
import { UserForm } from '@/features/user/components/form/UserForm';
import { useUser } from '@/lib/auth';

import { useMemo } from 'react';

export const EditProfile = () => {
  const { data: user } = useUser();
  const { mutateAsync: updateUserAsync, status: updateUserStatus } =
    useUpdateUser();

  const submitHandler = async (data: UserRequest) => {
    await updateUserAsync({ ...data, id: user?.id! });
  };

  const formData: UserRequest | undefined = useMemo(
    () =>
      user && {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        blocked: user.blocked,
      },
    [user],
  )!;

  return (
    <div className="relative mx-auto flex flex-col items-baseline justify-between text-blue-gray-900">
      <UserForm
        submitHandler={submitHandler}
        user={formData}
        isSubmitted={updateUserStatus === 'pending'}
      />
    </div>
  );
};

EditProfile.displayName = 'EditProfile';
