import { axios } from '@/lib/api-client';
import { User, UserDTO } from '../types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { RoleName } from '@/types';

const fetchUsers = async (): Promise<UserDTO> => {
  return await axios.get(`/users?all=true`);
};

type UserRole = Lowercase<RoleName>;

export type UserRoleMap = Partial<Record<UserRole, User[]>>;

export const useFetchUsersByRole = (): { userGroups: UserRoleMap } => {
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
