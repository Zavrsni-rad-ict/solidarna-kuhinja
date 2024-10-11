import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';

import { axios } from '@/lib/api-client';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteEvent = (id: number) => axios.delete(`/events/${id}`);

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_EVENT],
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Uspesno ste obrisali event');

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
    },

    onError: (err) => {
      console.log({ err });
      return toast.error('Desila se greska');
    },
  });
};
