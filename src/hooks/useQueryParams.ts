import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const INITIAL_QUERY_PARAMS = {
  page: '1',
  search: '',
  role: '',
};

export type DEFAULT_QUERY_PARAMS = keyof typeof INITIAL_QUERY_PARAMS;

export const useQueryParams = <T = DEFAULT_QUERY_PARAMS>() => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(
    location.search ? undefined : INITIAL_QUERY_PARAMS,
  );

  const [allQueryParams, setAllQueryParams] = useState<
    Partial<typeof INITIAL_QUERY_PARAMS>
  >(Object.fromEntries(searchParams));

  useEffect(() => {
    setAllQueryParams(Object.fromEntries(searchParams));
  }, [searchParams]);

  const getQueryParamByKey = (key: T) => {
    const params = new URLSearchParams(location.search);
    return params.get(key as string) || '';
  };

  const setQueryParam = (key: T, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(key as string, value.toString());
    setSearchParams(params.toString());
  };

  const removeQueryParamByKey = (key: T) => {
    const params = new URLSearchParams(location.search);
    params.delete(key as string);
    setSearchParams(params.toString());
  };

  return {
    allQueryParams,
    getQueryParamByKey,
    setQueryParam,
    removeQueryParamByKey,
  };
};
