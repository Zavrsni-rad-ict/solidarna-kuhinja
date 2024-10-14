import { User } from '@/features/user/types';

export const useIsAdmin = (user: User | undefined | null) =>
  user?.role?.type === 'admin';
