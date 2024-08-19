import { MUTATION_KEYS } from '@/constants';
import { axios } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFetchRoles } from './useFetchRoles';
import { toast } from 'react-toastify';

export type RoleRequest = {
  name: string;
};

type RoleResponse = {
  ok: boolean;
};

const createRole = (role: RoleRequest): Promise<RoleResponse> =>
  axios.post('/users-permissions/roles', role);

export const useCreateRole = () => {
  const { data } = useFetchRoles();
  return useMutation<RoleResponse, string | AxiosError, RoleRequest>({
    mutationKey: [MUTATION_KEYS.CREATE_ROLE],
    mutationFn: createRole,
    onMutate: ({ name }) => {
      if (data?.roles.some((role) => role.name === name)) {
        throw 'Ovaj naziv role vec postoji';
      }
    },
    onError: (err) => {
      const message = typeof err === 'string' ? err : err.message;
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Uspesno si dodao novu rolu');
    },
  });
};
