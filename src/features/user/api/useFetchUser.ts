import { QUERY_KEYS } from '@/constants';
import { createFetchFn } from '@/utils';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '../types';

const fetchUser = createFetchFn<number, User>({
  method: 'get',
  getURL: (id) => `/api/users/${id}`,
});

export const useFetchUser = (
  id: number,
  queryConfig?: UseQueryOptions<User>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUser(id),
    ...queryConfig,
  });
};
