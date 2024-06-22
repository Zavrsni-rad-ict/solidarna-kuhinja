import { configureAuth } from 'react-query-auth';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';

import { axios } from './api-client';
import storage from '@/utils/storage';
import { JWT_TOKEN_LOCAL_STORAGE_KEY, QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User | null> => {
  const token = storage.get(JWT_TOKEN_LOCAL_STORAGE_KEY); // Adjust this based on where you store your token

  if (!token) {
    // User is not authenticated
    return null;
  }

  try {
    const response = await axios.get<any, User>('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

const logout = (): Promise<void> => {
  return axios.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

type Request = {
  identifier: string;
} & Pick<LoginInput, 'password'>;

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  const request: Request = { identifier: data.email, password: data.password };
  return axios.post('/auth/local', request);
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return axios.post('/auth/register', data);
};

async function handleUserResponse(data: AuthResponse) {
  const { jwt, user } = data;
  storage.set(JWT_TOKEN_LOCAL_STORAGE_KEY, jwt);
  return user;
}

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);

    return user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
  userKey: [QUERY_KEYS.AUTHENTICATED_USER],
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
