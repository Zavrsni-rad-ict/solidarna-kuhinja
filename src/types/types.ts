import { Pagination } from './api';

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
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Meta = {
  pagination: Pagination;
};
