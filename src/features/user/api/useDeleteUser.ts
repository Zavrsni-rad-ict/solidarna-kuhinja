import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS } from '@/constants';
import { toast } from 'react-toastify';

const deleteUser = (id: number) => axios.delete(`/users/${id}`);

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: deleteUser,
    onSuccess: () => toast.success('Korisnik je uspesno obrisan - HC'),

    onError: (err) => {
      console.log({ err });
      return toast.error('Desila se greska');
    },
  });
};
