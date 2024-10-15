import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export type EventRequest = {
  locationName: string;
  date: string;
  latitude: number;
  longitude: number;
  numberOfCooks: number;
  numberOfDeliveryPerson: number;
  numberOfFieldWorkers: number;
};

const createEvent = (event: EventRequest) =>
  axios.post('/events', { data: event });

export const useCreateEvent = () => {
  const { t: tE } = useTranslation('Event');

  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_EVENT],
    mutationFn: createEvent,
    onError: (error) => {
      toast.error('Error');
      console.log(error);
    },
    onSuccess: () => {
      toast.success(tE('toastSuccess.create'));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
    },
  });
};
