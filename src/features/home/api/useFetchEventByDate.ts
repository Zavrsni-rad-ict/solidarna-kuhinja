import { QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { EventResponse } from '../types';

const fetchEventByDate = async (date: string): Promise<EventResponse> =>
  await axios.get(`/events?filters[date][$eq]=${date}`);

export const useFetchEventByDate = (
  date: string,
  queryConfig?: Omit<UseQueryOptions<EventResponse>, 'queryKey'>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: () => fetchEventByDate(date),
    ...queryConfig,
  });
};
