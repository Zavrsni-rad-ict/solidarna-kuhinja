import { axios } from '@/lib/api-client';
import { AuthResponse } from '@/types/api';
import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

type Data = {
  email: string;
  password: string;
};

type Request = {
  identifier: string;
} & Pick<Data, 'password'>;

export const loginWithEmailAndPassword = (
  data: LoginInput,
): Promise<AuthResponse> => {
  const request: Request = { identifier: data.email, password: data.password };
  return axios.post('/auth/local', request);
};
