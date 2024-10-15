import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import {
  MUTATION_KEYS,
  REDIRECT_AFTER_2_SECONDS,
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
    mutationKey: [MUTATION_KEYS.UPDATE_USER],
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Uspesno ste izmenili korisnika - hc');

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });

      setTimeout(() => {
        navigate('/users');
      }, REDIRECT_AFTER_2_SECONDS);
    },
    onError: (err) => toast.error(`Desila se greska: ${err.message}`),
  });
};
