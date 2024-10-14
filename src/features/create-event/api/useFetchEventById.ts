import { QUERY_KEYS } from '@/constants';

import { axios } from '@/lib/api-client';
import { SingleEventResponse } from '@/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const fetchEvent = async (id: string): Promise<SingleEventResponse> =>
  await axios.get(`/events/${id}?populate=*`);

export const useFetchEventById = (
  id: string,
  queryConfig?: Omit<UseQueryOptions<SingleEventResponse>, 'queryKey'>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENTS, id],
    queryFn: () => fetchEvent(id),
    ...queryConfig,
  });
};
