import { QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { RoleResponse } from '@/types/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const fetchRoles = async (): Promise<RoleResponse> =>
  await axios.get('/users-permissions/roles');

export const useFetchRoles = (queryConfig?: UseQueryOptions<RoleResponse>) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ROLES],
    queryFn: fetchRoles,
    ...queryConfig,
  });
};
