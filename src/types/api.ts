// let's imagine this file is autogenerated from the backend
// ideally, we want to keep these api related types in sync
// with the backend instead of manually writing them out

import { User } from '@/features/user/types';

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type Team = Entity<{
  name: string;
  description: string;
}>;

export type Discussion = Entity<{
  title: string;
  body: string;
  teamId: string;
  author: User;
}>;

export type Comment = Entity<{
  body: string;
  discussionId: string;
  author: User;
}>;

export type RoleResponse = {
  roles: Role[];
};

export type Role = {
  id: number;
  name: RoleName;
  description: string;
  createdAt: string;
  type: Lowercase<RoleName>;
  updatedAt: string;
  nb_users: number;
};

export type SingleRole = {
  id: number;
  name: RoleName;
  type: Lowercase<RoleName>;
  permissions: any;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type SingleRoleResponse = { role: SingleRole };

export type RoleName =
  | 'Authenticated'
  | 'Public'
  | 'Admin'
  | 'Cook'
  | 'Deliverer'
  | 'FieldWorker';

export enum RoleEnum {
  Authenticated = 1,
  Public = 2,
  Admin = 3,
  Cook = 4,
  Deliverer = 5,
  FieldWorker = 6,
}

export type ActionResponse = {
  ok: boolean;
};

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type EventData = {
  id: number;
  attributes: LocationAttributes;
};

export type SingleEventResponse = {
  data: EventData;
  meta: Pagination;
};

export type LocationAttributes = {
  locationName: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  latitude: number;
  longitude: number;
  numberOfCooks: number;
  numberOfDeliveryPerson: number;
  numberOfFieldWorkers: number;
  signedUpChefs: number;
  signedUpFieldWorkers: number;
  signedUpDeliverer: number;
  users: { data: UserField[] };
};

export type UserField = {
  id: number;
  attributes: User[]; // TODO odraditi pick za ova polja ->
};
/**
 *  "attributes": {
                                "username": "kuvar1",
                                "email": "kuvar1@gmail.com",
                                "provider": "local",
                                "confirmed": false,
                                "blocked": false,
                                "createdAt": "2024-09-26T11:07:09.421Z",
                                "updatedAt": "2024-10-07T22:26:40.021Z",
                                "firstName": "Kuvar",
                                "lastName": "Kuvarković",
                                "participationCount": null
                            }
 */
