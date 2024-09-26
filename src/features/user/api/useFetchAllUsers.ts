import { QUERY_KEYS } from '@/constants';

import {
  UseQueryOptions,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { UserDTO } from '../types';
import { RoleName } from '@/types';

type Props = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  role?: null | Lowercase<RoleName>;
};

const fetchUsers = async ({
  pageNumber,
  pageSize,
  search,
  role,
}: Props): Promise<UserDTO> => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  const roleName = role ? `&role=${encodeURIComponent(role)}` : '';

  return await axios.get(
    `/users?page=${pageNumber}&pageSize=${pageSize}${searchParam}${roleName}`,
  );
};

export const useFetchAllUsers = (
  { pageNumber, pageSize, search, role }: Props,
  queryConfig?: UseQueryOptions<UserDTO>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, pageNumber, pageSize, search, role],
    queryFn: () => fetchUsers({ pageNumber, pageSize, search, role }),
    placeholderData: keepPreviousData,
    ...queryConfig,
  });
};
