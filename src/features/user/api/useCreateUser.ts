import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS } from '@/constants';

type UserRequest = {
  email: string;
  username: string;
  password: string;
  role: number;
};

const createUser = (user: UserRequest) => axios.post('/api/users', user);

export const useCreateUser = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: createUser,
  });
};
