import { Button, Dropdown, InputGroup } from '@/components';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { Spinner } from '@/components/ui/spinner';
import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '@/constants';
import { useFetchRoles } from '@/features/role';
import { yupResolver } from '@hookform/resolvers/yup';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { UserRequest } from '../../api';
import { useFeatureFlags } from '@/hooks';

type Props = {
  user?: UserRequest;
  submitHandler: (data: UserRequest) => Promise<void>;
  isSubmitted?: boolean;
  shouldShowRoleInput?: boolean;
};

export const UserForm = ({
  user,
  submitHandler,
  isSubmitted,
  shouldShowRoleInput,
}: Props) => {
  const { t: tGE } = useTranslation('GlobalError');
  const { t: tL } = useTranslation('Login');
  const { t: tG } = useTranslation('General');
  const { t: tUL } = useTranslation('UserList');

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(tL('errors.validation.email'))
      .required(tGE('required')),
    password: yup
      .string()
      .transform((value) => (value === '' ? undefined : value))
      .when('$user', (_, schema) => {
        return user
          ? schema
              .nullable() // Ako postoji user, password je opcion
              .notRequired()
              .min(
                MINIMUM_CHARACTERS,
                `Password must be at least ${MINIMUM_CHARACTERS} characters`,
              )
              .max(
                MAXIMUM_CHARACTERS,
                `Password must be at most ${MAXIMUM_CHARACTERS} characters`,
              )
              .optional()
          : schema
              .required('Password is required') // Ako nema user-a, password je obavezan
              .min(
                MINIMUM_CHARACTERS,
                `Password must be at least ${MINIMUM_CHARACTERS} characters`,
              )
              .max(
                MAXIMUM_CHARACTERS,
                `Password must be at most ${MAXIMUM_CHARACTERS} characters`,
              );
      }),
    firstName: yup
      .string()
      .required(tGE('required'))
      .matches(
        /^(?:\p{Lu}[\p{Ll}]*)(?:\s+\p{Lu}[\p{Ll}]*)?$/u,
        tGE('capitalLetter'),
      ),
    lastName: yup
      .string()
      .required(tGE('required'))
      .matches(
        /^(?:\p{Lu}[\p{Ll}]*)(?:\s+\p{Lu}[\p{Ll}]*)?$/u,
        tGE('capitalLetter'),
      ),
    username: yup.string().required(tGE('required')),
    role: yup.number().when('$user', (_, schema) => {
      return user?.role
        ? schema.required(tGE('required')).typeError(tGE('required'))
        : schema.notRequired();
    }),
    participationCount: yup.number().optional(),
  });

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema) as any,
    shouldFocusError: false,
    defaultValues: user,
  });

  const { handleSubmit } = methods;

  // TODO: Namestiti ako bude vremena
  // const { dirtyFields } = useFormState({ control });

  const { data, isLoading: isLoadingRoles } = useFetchRoles();

  const onSubmit: SubmitHandler<UserRequest> = (data) => submitHandler(data);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') return handleSubmit(onSubmit);
  };

  const uploadImageFF = useFeatureFlags('uploadImageFF');

  return (
    <RHFFormProvider
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      methods={methods}
    >
      <div className="flex justify-around flex-wrap gap-4">
        <div className="max-w-[820px] w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-6">
            <InputGroup
              name="firstName"
              placeholder="First Name"
              label={tUL('columns.firstName')}
            />
          </div>
          <div className="col-span-6">
            <InputGroup
              name="lastName"
              placeholder="Last Name"
              label={tUL('columns.lastName')}
            />
          </div>
          <div className="col-span-4">
            <InputGroup
              name="username"
              placeholder="Username"
              label={tUL('columns.username')}
            />
          </div>

          <div className="col-span-4">
            <InputGroup name="email" placeholder="Email" label="Email" />
          </div>
          <div className="col-span-4">
            <InputGroup
              name="password"
              placeholder="passowrd"
              label="Password"
              type="password"
            />
          </div>

          {shouldShowRoleInput && (
            <div className="col-span-12">
              {isLoadingRoles ? (
                <Spinner />
              ) : (
                <Dropdown label="Role" name="role">
                  {data?.roles
                    // ? This solution is only valid on the Strapi service because initially, they have 2 more roles (public and authenticated).
                    .filter((role) =>
                      ['admin', 'chefs', 'deliverer', 'fieldworker'].includes(
                        role.type,
                      ),
                    )
                    .map((role) => (
                      <option value={role.id} key={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Dropdown>
              )}
            </div>
          )}

          {/* We want to hide this field while is creating new user */}
          {/* {loggedUser?.role.type === 'admin' && (
            <div className="col-span-12">
              <InputGroup
                name="participationCount"
                placeholder="Number"
                label={tUL('columns.participationCount')}
                type="text"
              />
            </div>
          )} */}

          <div className="col-start-1 mt-6">
            <Button
              type="submit"
              variant={isSubmitted ? 'disabled' : 'primary'}
              disabled={isSubmitted}
              className={`w-[83px] h-[40px] ${
                isSubmitted ? 'cursor-not-allowed' : ''
              }`}
            >
              {isSubmitted ? (
                <Spinner variant="light" size="sm" className="w-full" />
              ) : (
                tG('submit')
              )}
            </Button>
          </div>
        </div>
        {uploadImageFF && (
          <div className="max-w-[600px] w-full bg-red-500 h-96">
            <h1>Prostor za sliku</h1>
          </div>
        )}
      </div>
    </RHFFormProvider>
  );
};

UserForm.displayName = 'UserForm';
