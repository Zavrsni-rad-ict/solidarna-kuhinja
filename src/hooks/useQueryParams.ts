import { useEffect, useState } from 'react';
import {
  URLSearchParamsInit,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

type Props = { defaultParams?: URLSearchParamsInit };

export const useQueryParams = <T>({ defaultParams }: Props) => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(
    location.search ? undefined : defaultParams,
  );
  const [allQueryParams, setAllQueryParams] = useState(
    Object.fromEntries(searchParams),
  );

  useEffect(() => {
    if (
      JSON.stringify(Object.fromEntries(searchParams)) !==
      JSON.stringify(defaultParams)
    )
      return;

    setSearchParams(defaultParams);
  }, []);

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

  const removeQueryParamByKey = (key: string) => {
    const params = new URLSearchParams(location.search);
    params.delete(key);
    setSearchParams(params.toString());
  };

  return {
    allQueryParams,
    getQueryParamByKey,
    setQueryParam,
    removeQueryParamByKey,
  };
};
