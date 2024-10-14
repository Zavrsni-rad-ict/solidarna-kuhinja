import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { EventRequest } from './useCreateEvent';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/react-query';

interface UpdateEventVariables {
  id: string;
  event: EventRequest;
}

const updateEvent = ({ event, id }: UpdateEventVariables) =>
  axios.put(`/events/${id}`, { data: event });

export const useUpdateEvent = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_EVENT],
    mutationFn: updateEvent,
    onMutate: () => {},
    onError: () => {
      toast.error('Desila se greska');
    },
    onSuccess: () => {
      toast.success('HC - Uspesno si updateovao event');

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
    },
  });
};
