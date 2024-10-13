import { QUERY_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

type LanguageResponse = {
  code: string;
  createdAt: string;
  id: number;
  isDefault: true;
  name: string;
  updatedAt: string;
};

const fetchLanugages = (): Promise<LanguageResponse[]> =>
  axios.get('/i18n/locales');

export const useFetchLanguages = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LANGUAGES],
    queryFn: fetchLanugages,
  });
};
