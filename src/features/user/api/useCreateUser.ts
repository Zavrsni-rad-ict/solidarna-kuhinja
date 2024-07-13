import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS } from '@/constants';
import { RoleEnum } from '@/types/api';
import { toast } from 'react-toastify';

export type UserRequest = {
  email: string;
  username: string;
  password: string;
  role: RoleEnum;
  firstName: string;
  lastName: string;
};

const createUser = (user: UserRequest) => axios.post('/users', user);

export const useCreateUser = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: createUser,
    onSuccess: () => toast.success('Uspesno'),
    onError: () => toast.error('DESILA SE GRESKA'),
  });
};
