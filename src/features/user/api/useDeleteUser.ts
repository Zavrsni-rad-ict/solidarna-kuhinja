import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { toast } from 'react-toastify';
import { User } from '../types';

const deleteUser = (id: number) => axios.delete(`/users/${id}`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: deleteUser,
    onSuccess: (deletedUser) => {
      toast.success('Korisnik je uspesno obrisan - HC');

      const users: User[] = queryClient.getQueryData([QUERY_KEYS.USERS])!;
      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        users.filter((user) => user.id !== deletedUser.id),
      );
    },

    onError: (err) => {
      console.log({ err });
      return toast.error('Desila se greska');
    },
  });
};
