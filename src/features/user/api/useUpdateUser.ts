import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS } from '@/constants';
import { RoleEnum } from '@/types/api';

type UserUpdateRequest = {
  email: string;
  username: string;
  role: RoleEnum;
};

const updateUser = (user: UserUpdateRequest) => axios.put('/users', user);

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: updateUser,
  });
};
