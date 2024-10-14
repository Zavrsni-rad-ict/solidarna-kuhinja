import { NumberOfRoles, SignedUpRoles } from './types';

export const JWT_TOKEN_LOCAL_STORAGE_KEY = 'jwt';

export const HEADER_HEIGHT = 96;

export const MINIMUM_CHARACTERS = 5;
export const MAXIMUM_CHARACTERS = 50;

export const REDIRECT_AFTER_3_SECONDS = 3000;

export const DEBOUNCE_DELAY = 300;

export const BELGRADE_COORDINATES = {
  lat: 44.8125,
  lng: 20.4612,
} as const;

export enum QUERY_KEYS {
  AUTHENTICATED_USER = 'AUTHENTICATED_USER',
  USERS = 'USERS',
  ROLES = 'ROLES',
  EVENTS = 'EVENTS',
  LANGUAGES = 'LANGUAGES',
}

export enum MUTATION_KEYS {
  CREATE_USER = 'CREATE_USER',
  DELETE_USER = 'DELETE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER_FOR_EVENT = 'DELETE_USER_FOR_EVENT',

  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',

  CREATE_EVENT = 'CREATE_EVENT',
  UPDATE_EVENT = 'UPDATE_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
}

export type Size = 'xs' | 'sm' | 'm' | 'l' | 'xl' | '2xl' | '3xl';
export const ICON_SIZE = {
  xs: 8,
  sm: 16,
  m: 24,
  l: 32,
  xl: 48,
  '2xl': 64,
  '3xl': 96,
  '4xl': 128,
} as const;

export const nullValueText = '\u2014';

// TODO Prepraviti tipove i renamovati key (number -> totalSignedUp)
export const RoleMap: Record<
  any,
  { signedUp: SignedUpRoles; number: NumberOfRoles }
> = {
  chefs: {
    signedUp: 'signedUpChefs',
    number: 'numberOfCooks',
  },
  deliverer: {
    signedUp: 'signedUpDeliverer',
    number: 'numberOfDeliveryPerson',
  },
  fieldworker: {
    signedUp: 'signedUpFieldWorkers',
    number: 'numberOfFieldWorkers',
  },
};
