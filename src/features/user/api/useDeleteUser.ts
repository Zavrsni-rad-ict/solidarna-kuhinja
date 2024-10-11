import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { toast } from 'react-toastify';
import { User } from '../types';

const deleteUser: MutationFunction<User, number> = (id: number) =>
  axios.delete(`/users/${id}`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_USER],
    mutationFn: deleteUser,
    onSuccess: (deletedUser) => {
      toast.success('Korisnik je uspesno obrisan - HC');

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },

    onError: (err) => {
      console.log({ err });
      return toast.error('Desila se greska');
    },
  });
};
