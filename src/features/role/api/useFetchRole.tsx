import { QUERY_KEYS } from '@/constants';
import { Role } from '@/types/api';
// import { Role } from '@/types/api';
// import { Role } from '../../../types/api';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRole = async (id: number): Promise<Role> =>
  await axios.get(`/api/users-permissions/roles/${id}`);

export const useFetchRole = (
  id: number,
  queryConfig?: UseQueryOptions<Role>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ROLES, id],
    queryFn: () => fetchRole(id),
    ...queryConfig,
  });
};
