import { Meta } from '@/types';
import { Role } from '@/types/api';

type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
};

export type UserDTO = {
  data: User[];
  meta: Meta;
};
