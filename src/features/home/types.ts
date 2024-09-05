import { Pagination } from '@/types';

type LocationAttributes = {
  locationName: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  latitude: number;
  longitude: number;
};

type EventData = {
  id: number;
  attributes: LocationAttributes;
};

export type EventResponse = {
  data: EventData[];
  meta: Pagination;
};