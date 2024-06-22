import { InputGroup } from '@/components/InputGroup/InputGroup';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/lib/auth';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { Button } from '@/components/Button';

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

  const { handleSubmit, control } = methods;

  const { mutate: login } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = (data) => login(data);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') return handleSubmit(onSubmit);
  };

  return (
    <RHFFormProvider
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      methods={methods}
    >
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
        <Button value="Submit" variant="red" type="submit" />
      </div>
    </RHFFormProvider>
  );
};

LoginForm.displayName = 'LoginForm';
