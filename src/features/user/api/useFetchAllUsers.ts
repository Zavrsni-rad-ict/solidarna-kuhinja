import { QUERY_KEYS } from '@/constants';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '../types';
import { axios } from '@/lib/api-client';

const fetchUsers = async (): Promise<User[]> => await axios.get('/users');

export const useFetchAllUsers = (queryConfig?: UseQueryOptions<User[]>) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
    ...queryConfig,
  });
};
