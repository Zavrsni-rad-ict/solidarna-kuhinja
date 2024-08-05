import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import {
  MUTATION_KEYS,
  REDIRECT_AFTER_3_SECONDS,
  QUERY_KEYS,
} from '@/constants';
import { toast } from 'react-toastify';
import { UserRequest } from './useCreateUser';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const updateUser = (user: UserRequest & { id: number }): Promise<User> => {
  return axios.put(`/users/${user.id}`, user);
};

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: updateUser,
    onMutate: (updatedUser) => {
      queryClient.setQueryData([QUERY_KEYS.USERS, updatedUser.id], updatedUser);
    },
    onSuccess: (updatedUser) => {
      toast.success('Suepriska!');

      const users = queryClient.getQueryData<User[]>([QUERY_KEYS.USERS]);

      queryClient.setQueryData([QUERY_KEYS.USERS, updatedUser.id], updatedUser);

      if (users) {
        queryClient.setQueryData<User[]>([QUERY_KEYS.USERS], () => {
          console.log('Korisnik update', { users });
          if (!users) return [];

          const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user,
          );

          return updatedUsers;
        });
      }

      setTimeout(() => {
        navigate('/users');
      }, REDIRECT_AFTER_3_SECONDS);
    },
    onError: (err) => toast.error(`Desila se greska: ${err.message}`),
  });
};
