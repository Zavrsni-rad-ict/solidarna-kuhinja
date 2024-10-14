import { axios } from '@/lib/api-client';
import { UserDTO } from '../types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';

const fetchUsers = async (): Promise<UserDTO> => {
  return await axios.get(`/users?all=true`);
};

export const useFetchUsersByRole = () => {
  const { data: users } = useQuery({
    queryKey: [QUERY_KEYS.USERS, { showAllPage: true }],
    queryFn: () => fetchUsers(),
  });

  return {
    userGroups: users
      ? Object.groupBy(users.data, (user) => user.role.type)
      : {},
  };
};
