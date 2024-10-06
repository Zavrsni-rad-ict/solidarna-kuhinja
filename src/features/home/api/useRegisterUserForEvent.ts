import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const registerUserForEvent = ({
  eventId,
  usersIds,
  signedUpChefs,
}: {
  eventId: number;
  usersIds: number[];
  numberOfCooks: number;
  signedUpChefs: number;
}) =>
  axios.put(`/event/${eventId}`, {
    data: { users: usersIds },
  });

export const useRegisterUserForEvent = () => {
  return useMutation<any, string | AxiosError, any>({
    mutationKey: [MUTATION_KEYS.UPDATE_EVENT],
    mutationFn: registerUserForEvent,
    onMutate: ({ numberOfCooks, signedUpChefs }) => {
      if (numberOfCooks === signedUpChefs) {
        throw 'Nema potrebe da se prijavlju kuvari vise za ovaj dogadjaj';
      }
    },
    onSuccess: () => {
      toast.success('Uspesno ste se prijavili na dogadjaj!');

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.AUTHENTICATED_USER],
        }),
      ]);
    },
    onError: (error) => {
      console.log('OnError', error);
      toast.error(error.toString());
    },
  });
};
