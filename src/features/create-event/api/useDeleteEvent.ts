import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';

import { axios } from '@/lib/api-client';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const deleteEvent = (id: number) => axios.delete(`/events/${id}`);

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  const { t: tE } = useTranslation('Event');

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_EVENT],
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success(tE('toastSuccess.delete'));

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
    },

    onError: (err) => {
      console.log({ err });
      return toast.error('Error');
    },
  });
};
