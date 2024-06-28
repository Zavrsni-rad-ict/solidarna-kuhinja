import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS } from '@/constants';

const deleteUser = (id: number) => axios.delete(`/api/users/${id}`);

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: deleteUser,
  });
};
