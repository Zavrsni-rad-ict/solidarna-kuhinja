import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import {
  MUTATION_KEYS,
  QUERY_KEYS,
  REDIRECT_AFTER_3_SECONDS,
} from '@/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import { User } from '../types';
import { AxiosError } from 'axios';

export type UserRequest = {
  email: string;
  username: string;
  password: string;
  role: number;
  firstName: string;
  lastName: string;
  blocked: boolean;
};

const createUser = (user: UserRequest): Promise<User> =>
  axios.post('/users', user);

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation<User, AxiosError, UserRequest, unknown>({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: createUser,
    onSuccess: (createdUser) => {
      toast.success('Uspesno');

      const users = queryClient.getQueryData<User[]>([QUERY_KEYS.USERS]);

      if (users) {
        queryClient.setQueryData<User[]>([QUERY_KEYS.USERS], () => {
          if (!users) return [];

          return [...users, createdUser];
        });
      }
      setTimeout(() => navigate('/users'), REDIRECT_AFTER_3_SECONDS);
    },
    onError: (err) => {
      // TODO: Obrisi as any da vidis gresku...
      return toast.error((err.response?.data as any).error.message);
    },
  });
};
