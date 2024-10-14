import { Pagination, UserField } from './api';

export type FormProps = {
  status: 'error' | 'idle' | 'pending' | 'success';
};

export type EventLocation = {
  id: number;
  name: string;
  coordinates: Coordinates;
  date: string;
  numberOfCooks: number;
  numberOfDeliveryPerson: number;
  numberOfFieldWorkers: number;
  signedUpChefs: number;
  signedUpDeliverer: number;
  signedUpFieldWorkers: number;
  signedInUsers: UserField[];
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Meta = {
  pagination: Pagination;
};

export type SignedUpRoles =
  | 'signedUpChefs'
  | 'signedUpFieldWorkers'
  | 'signedUpDeliverer';

export type NumberOfRoles =
  | 'numberOfCooks'
  | 'numberOfDeliveryPerson'
  | 'numberOfFieldWorkers';
