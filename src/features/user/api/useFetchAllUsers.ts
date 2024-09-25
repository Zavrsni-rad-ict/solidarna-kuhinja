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
};

const fetchUsers = async ({ pageNumber, pageSize }: Props): Promise<UserDTO> =>
  await axios.get(`/users?page=${pageNumber}&pageSize=${pageSize}`);

export const useFetchAllUsers = (
  { pageNumber, pageSize }: Props,
  queryConfig?: UseQueryOptions<UserDTO>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, pageNumber, pageSize],
    queryFn: () => fetchUsers({ pageNumber, pageSize }),
    placeholderData: keepPreviousData,
    ...queryConfig,
  });
};
