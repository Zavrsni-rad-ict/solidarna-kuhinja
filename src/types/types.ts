import { Pagination } from './api';

export type FormProps = {
  status: 'error' | 'idle' | 'pending' | 'success';
};

export type EventLocation = {
  name: string;
  coordinates: Coordinates;
  date: string;
  numberOfCooks: number;
  numberOfDeliveryPerson: number;
  numberOfFieldWorkers: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Meta = {
  pagination: Pagination;
};
