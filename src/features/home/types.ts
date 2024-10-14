import { EventData, Pagination } from '@/types';

export type EventResponse = {
  data: EventData[];
  meta: Pagination;
};
