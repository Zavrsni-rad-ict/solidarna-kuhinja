import { EventLocation, Meta } from '@/types';
import { Role } from '@/types/api';

export type User = {
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
  events: EventLocation[];
};

export type UserDTO = {
  data: User[];
  meta: Meta;
};
