import React from 'react';
import { RoleForm } from './form/RoleForm';
import { RoleRequest, useCreateRole } from '../api';
import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { MAXIMUM_CHARACTERS } from '@/constants';

export const CreateRole = () => {
  const { mutateAsync: createRoleAsync, status } = useCreateRole();

  const submitHandler = async (data: RoleRequest) => {
    await createRoleAsync(data);
  };

  const { t: tGE } = useTranslation('GlobalError');

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, `${tGE('minimumCharacters')} 3`)
      .max(
        MAXIMUM_CHARACTERS,
        `${tGE('maximumCharacters')} ${MAXIMUM_CHARACTERS}`,
      )
      .required(),
  });

  return (
    <FormWrapper schema={schema} submitHandler={submitHandler}>
      <RoleForm status={status} />
    </FormWrapper>
  );
};

CreateRole.displayName = 'CreateRole';
