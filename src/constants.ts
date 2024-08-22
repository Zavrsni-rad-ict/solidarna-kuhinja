export const JWT_TOKEN_LOCAL_STORAGE_KEY = 'jwt';

export const HEADER_HEIGHT = 106;

export const MINIMUM_CHARACTERS = 5;
export const MAXIMUM_CHARACTERS = 50;

export const REDIRECT_AFTER_3_SECONDS = 3000;

export enum QUERY_KEYS {
  AUTHENTICATED_USER = 'AUTHENTICATED_USER',
  USERS = 'USERS',
  ROLES = 'ROLES',
}

export enum MUTATION_KEYS {
  CREATE_USER = 'CREATE_USER',
  DELETE_USER = 'DELETE_USER',
  // TODO - Update user??

  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',
}
