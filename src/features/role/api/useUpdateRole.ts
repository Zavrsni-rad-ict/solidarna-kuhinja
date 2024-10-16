import { axios } from '@/lib/api-client';
import { RoleRequest } from './useCreateRole';
import { ActionResponse, RoleName, RoleResponse } from '@/types';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS, REDIRECT_DELAY } from '@/constants';
import { useFetchRoles } from './useFetchRoles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type UpdateRoleRequest = RoleRequest & { id: number };

const updateRole = (role: UpdateRoleRequest): Promise<ActionResponse> =>
  axios.put(`/users-permissions/roles/${role.id}`, { name: role.name });

export const useUpdateRole = () => {
  const { data } = useFetchRoles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ActionResponse, string | AxiosError, UpdateRoleRequest>({
    mutationKey: [MUTATION_KEYS.UPDATE_ROLE],
    mutationFn: updateRole,
    onMutate: ({ name, id }) => {
      if (data?.roles.some((role) => role.name === name)) {
        throw 'Ovaj naziv role vec postoji';
      }

      queryClient.setQueryData([QUERY_KEYS.ROLES, id], { name, id });

      queryClient.setQueryData([QUERY_KEYS.ROLES], (data: RoleResponse) => {
        const roles = data.roles;

        if (!roles) return [];

        const updatedRoles = roles.map((role) =>
          role.id === id ? { ...role, name: name as RoleName } : role,
        );

        return updatedRoles;
      });
    },
    onError: (err) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.ROLES] });

      const message = typeof err === 'string' ? err : err.message;
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Uspesno si izmenio rolu');

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLES] });

      setTimeout(() => {
        navigate('/roles');
      }, REDIRECT_DELAY);
    },
  });
};
