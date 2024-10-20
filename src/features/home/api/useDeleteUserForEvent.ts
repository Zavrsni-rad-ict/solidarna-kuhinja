import { MUTATION_KEYS, QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

type Props = {
  userId: number;
  eventId: number;
  signedKey: string;
};
const deleteUserForEvent = ({ eventId, userId, signedKey }: Props) =>
  axios.delete(`/users/${userId}/events/${eventId}?signedKey=${signedKey}`);

export const useDeleteUserForEvent = () => {
  const { t } = useTranslation('Event');

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_USER_FOR_EVENT],
    mutationFn: deleteUserForEvent,
    onSuccess: () => {
      toast.success(t('toastSuccess.signOut'));

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.AUTHENTICATED_USER],
        }),
      ]);
    },
  });
};
