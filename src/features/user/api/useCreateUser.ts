import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import {
  MUTATION_KEYS,
  QUERY_KEYS,
  REDIRECT_AFTER_2_SECONDS,
} from '@/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import { AxiosError } from 'axios';
import { User } from '../types';

export type UserRequest = {
  email: string;
  username: string;
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

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });

      setTimeout(() => navigate('/users'), REDIRECT_AFTER_2_SECONDS);
    },
    onError: (err) => {
      // TODO: Obrisi as any da vidis gresku...
      return toast.error((err.response?.data as any).error.message);
    },
  });
};
