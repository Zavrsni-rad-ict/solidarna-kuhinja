import { QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { EventResponse } from '../types';

const fetchEvents = async (): Promise<EventResponse> =>
  await axios.get('/events');

export const useFetchEvents = (
  queryConfig?: UseQueryOptions<EventResponse>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: fetchEvents,
    ...queryConfig,
  });
};
