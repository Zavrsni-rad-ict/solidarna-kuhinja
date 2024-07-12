import { axios } from '@/lib/api-client';
import { QueryFunctionContext } from '@tanstack/react-query';

type Props<Params> = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  getURL: (params: Params) => string;
  getBody?: (params: Params) => Record<any, any>;
};

export const createFetchFn =
  <Params, Response>({ method, getURL, getBody }: Props<Params>) =>
  (params: Params) =>
  async ({ signal }: QueryFunctionContext): Promise<Response> => {
    if (
      typeof getBody === 'function' &&
      method !== 'get' &&
      method !== 'delete'
    ) {
      const res = await axios[method]<Response>(
        getURL(params),
        getBody(params),
        {
          signal,
        },
      );
      return res.data;
    }

    const res = await axios[method]<Response>(getURL(params), {
      signal,
    });

    return res.data;
  };
