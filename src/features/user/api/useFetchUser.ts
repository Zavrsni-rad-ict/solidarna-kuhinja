import { QUERY_KEYS } from '@/constants';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '../types';
import { axios } from '@/lib/api-client';

const fetchUser = async (id: number): Promise<User> =>
  await axios.get(`/users/${id}?populate=*`);

export const useFetchUser = (
  id: number,
  queryConfig?: UseQueryOptions<User>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, id],
    queryFn: () => fetchUser(id),
    ...queryConfig,
  });
};
