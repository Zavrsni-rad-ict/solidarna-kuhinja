import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/api-client';
import { MUTATION_KEYS } from '@/constants';
import { RoleEnum } from '@/types/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export type UserRequest = {
  email: string;
  username: string;
  password: string;
  role: RoleEnum;
  firstName: string;
  lastName: string;
};

const createUser = (user: UserRequest) => axios.post('/users', user);

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_USER],
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('Uspesno');

      setTimeout(() => navigate('/users'), 2000);
    },
    onError: (err: AxiosError) => {
      return toast.error(err.response?.data.error.message);
    },
  });
};
