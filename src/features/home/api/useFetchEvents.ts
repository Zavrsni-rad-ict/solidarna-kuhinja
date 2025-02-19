import { QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { EventResponse } from '../types';

type Props = {
  pageNumber: number;
  pageSize: number;
};

const fetchEvents = async ({
  pageNumber,
  pageSize,
}: Props): Promise<EventResponse> =>
  await axios.get(
    `/events?populate=users.role&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`,
  );

export const useFetchEvents = (
  { pageNumber, pageSize }: Props,
  queryConfig?: Omit<UseQueryOptions<EventResponse>, 'queryKey'>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENTS, { pageNumber, pageSize }],
    queryFn: () => fetchEvents({ pageNumber, pageSize }),
    ...queryConfig,
  });
};
