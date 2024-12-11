import { axios } from '@/lib/api-client';
import { AuthResponse } from '@/types/api';
import { z } from 'zod';

export const loginInputSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Required')
    .refine(
      (value) =>
        value.includes('@')
          ? z.string().email().safeParse(value).success
          : true,
      { message: 'Invalid Email' },
    ),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

type Data = {
  identifier: string;
  password: string;
};

type Request = {
  identifier: string;
} & Pick<Data, 'password'>;

export const loginWithEmailAndPassword = (
  data: LoginInput,
): Promise<AuthResponse> => {
  const request: Request = {
    identifier: data.identifier,
    password: data.password,
  };
  return axios.post('/auth/local', request);
};
