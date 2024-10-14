import { QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { SingleRole, SingleRoleResponse } from '@/types/api';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const fetchRole = async (id: number): Promise<SingleRole> => {
  const res = await axios.get<any, SingleRoleResponse>(
    `/users-permissions/roles/${id}`,
  );

  return res.role;
};

export const useFetchRole = (
  id: number,
  queryConfig?: UseQueryOptions<SingleRole>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ROLES, id],
    queryFn: () => fetchRole(id),
    ...queryConfig,
  });
};
