import { MUTATION_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

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
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_EVENT],
    mutationFn: createEvent,
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
  });
};
