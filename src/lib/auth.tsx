import { configureAuth } from 'react-query-auth';
import { z } from 'zod';

import { AuthResponse } from '@/types/api';

import { axios } from './api-client';
import storage from '@/utils/storage';
import { JWT_TOKEN_LOCAL_STORAGE_KEY, QUERY_KEYS } from '@/constants';
import { LoginInput, loginWithEmailAndPassword, logout } from '@/features/auth';
import { toast } from 'react-toastify';
import { User } from '@/features/user/types';
import { queryClient } from './react-query';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User | null> => {
  const token = storage.get(JWT_TOKEN_LOCAL_STORAGE_KEY); // Adjust this based on where you store your token

  if (!token) {
    // User is not authenticated
    return null;
  }

  try {
    const response = await axios.get<any, User>('/users/me?populate=*', {
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
    try {
      const response = await loginWithEmailAndPassword(data);
      const user = await handleUserResponse(response);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTHENTICATED_USER],
      });

      return user;
    } catch (err: any) {
      toast.error(err.response.data.error.message);
    }
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
