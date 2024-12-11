import { InputGroup } from '@/components/InputGroup/InputGroup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/lib/auth';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { Button } from '@/components/Button';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t: tL } = useTranslation('Login');
  const { t: tGE } = useTranslation('GlobalError');
  const { t: tG } = useTranslation('General');

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(tL('errors.validation.email'))
      .required(tGE('required')),
    password: yup.string().required(tGE('required')),
  });

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const { handleSubmit, control } = methods;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate: login, status } = useLogin();

  useEffect(() => {
    if (status === 'success') setIsSubmitted(false);
  }, [status]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data);
    setIsSubmitted(true);
  };

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
        placeholder="Email..."
        control={control}
        name="email"
      />
      <InputGroup
        label={tL('password')}
        type="password"
        placeholder={`${tL('password')}...`}
        control={control}
        name="password"
      />
      <div className="flex justify-end mt-5">
        <Button
          variant="red"
          type="submit"
          className="max-w-28 min-w-24 h-[40px] flex justify-center items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitted && status === 'pending'}
        >
          {isSubmitted && status === 'pending' ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            tG('sign_in')
          )}
        </Button>
      </div>
    </RHFFormProvider>
  );
};

LoginForm.displayName = 'LoginForm';
