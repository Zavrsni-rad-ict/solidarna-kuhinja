import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { RoleName } from '@/types';

const registerUserForEvent = ({
  eventId,
  usersIds,
  roleName,
}: {
  eventId: number;
  usersIds: number[];
  roleName: Lowercase<RoleName>;
}) =>
  axios.put(`/event/${eventId}`, {
    data: { users: usersIds, signedKey: roleName },
  });

export const useRegisterUserForEvent = () => {
  return useMutation<any, string | AxiosError, any>({
    mutationKey: [MUTATION_KEYS.UPDATE_EVENT],
    mutationFn: registerUserForEvent,
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
