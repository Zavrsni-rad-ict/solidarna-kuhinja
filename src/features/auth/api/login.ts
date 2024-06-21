import { axios } from '@/lib/api-client';

type Data = {
  email: string;
  password: string;
};

type Request = {
  identifier: string;
} & Pick<Data, 'password'>;

export const loginWithEmailAndPassword = (data: Data) => {
  const request: Request = { identifier: data.email, password: data.password };
  return axios.post('/auth/local', request);
};
