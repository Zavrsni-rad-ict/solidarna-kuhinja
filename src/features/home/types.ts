import { Pagination } from '@/types';
import { User } from '../user/types';

type LocationAttributes = {
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

type EventData = {
  id: number;
  attributes: LocationAttributes;
};

export type EventResponse = {
  data: EventData[];
  meta: Pagination;
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
