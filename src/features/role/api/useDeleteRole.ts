import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { ActionResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteRole = async (id: number): Promise<ActionResponse> =>
  await axios.delete<number, ActionResponse>(`/users-permissions/roles/${id}`);

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: deleteRole,
    onMutate: (id) => {},
    onSuccess: () => {
      toast.success('Korisnik je uspesno obrisan - HC');

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLES] });
    },

    onError: (err) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.ROLES] });

      const message = typeof err === 'string' ? err : err.message;
      toast.error(message);
    },
  });
};
