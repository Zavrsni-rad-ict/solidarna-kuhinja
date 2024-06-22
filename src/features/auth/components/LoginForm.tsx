import { InputGroup } from '@/components/InputGroup/InputGroup';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/lib/auth';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation('');

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email nije validan')
      .required('Polje je obavezno'),
    password: yup.string().required(),
  });

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { mutate: login } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = (data) => login(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Email"
          placeholder="email..."
          control={control}
          name="email"
        />
        <InputGroup
          label="Password"
          type="password"
          placeholder="Password..."
          control={control}
          name="password"
        />
        <div className="flex justify-end mt-5">
          <input
            type="submit"
            value="SUBMIT"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          />
        </div>
      </form>
    </FormProvider>
  );
};

LoginForm.displayName = 'LoginForm';
