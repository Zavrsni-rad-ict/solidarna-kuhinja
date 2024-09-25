import { QUERY_KEYS } from '@/constants';

import {
  UseQueryOptions,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { UserDTO } from '../types';

type Props = {
  pageNumber: number;
  pageSize: number;
  search?: string;
};

const fetchUsers = async ({
  pageNumber,
  pageSize,
  search,
}: Props): Promise<UserDTO> => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  console.log({ searchParam });
  return await axios.get(
    `/users?page=${pageNumber}&pageSize=${pageSize}${searchParam}`,
  );
};

export const useFetchAllUsers = (
  { pageNumber, pageSize, search }: Props,
  queryConfig?: UseQueryOptions<UserDTO>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, pageNumber, pageSize, search],
    queryFn: () => fetchUsers({ pageNumber, pageSize, search }),
    placeholderData: keepPreviousData,
    ...queryConfig,
  });
};
