import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { ActionResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const deleteRole = async (id: number): Promise<ActionResponse> =>
  await axios.delete<number, ActionResponse>(`/users-permissions/roles/${id}`);

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  const { t: tR } = useTranslation('Role');

  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success(tR('toastSuccess'));

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLES] });
    },

    onError: (err) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.ROLES] });

      const message = typeof err === 'string' ? err : err.message;
      toast.error(message);
    },
  });
};
