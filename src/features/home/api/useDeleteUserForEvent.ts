import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type Props = {
  userId: number;
  eventId: number;
};
const deleteUserForEvent = ({ eventId, userId }: Props) =>
  axios.delete(`/users/${userId}/events/${eventId}`);

export const useDeleteUserForEvent = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_USER_FOR_EVENT],
    mutationFn: deleteUserForEvent,
    onSuccess: () => {
      toast.success('Uspesno si se odjavio sa eventa');

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.AUTHENTICATED_USER],
        }),
      ]);
    },
  });
};
