import { QUERY_KEYS } from '@/constants';
import { createFetchFn } from '@/utils';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '../types';

const fetchUsers = createFetchFn<void, User[]>({
  method: 'get',
  getURL: () => '/api/users',
});

export const useFetchAllUsers = (queryConfig?: UseQueryOptions<User[]>) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers(),
    ...queryConfig,
  });
};
