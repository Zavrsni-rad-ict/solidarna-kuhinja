import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { EventRequest } from './useCreateEvent';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/react-query';
import { useTranslation } from 'react-i18next';

interface UpdateEventVariables {
  id: string;
  event: EventRequest;
}

const updateEvent = ({ event, id }: UpdateEventVariables) =>
  axios.put(`/events/${id}`, { data: event });

export const useUpdateEvent = () => {
  const { t: tE } = useTranslation('Event');

  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_EVENT],
    mutationFn: updateEvent,
    onMutate: () => {},
    onError: () => {
      toast.error('Error...');
    },
    onSuccess: () => {
      toast.success(tE('toastSuccess.update'));

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
    },
  });
};
