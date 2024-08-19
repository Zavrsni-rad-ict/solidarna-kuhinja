import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { RHFFormProvider } from './RHFFormProvider';

interface FormWrapperProps<T extends FieldValues> {
  children: ReactNode;
  schema: any;
  defaultValues?: any;
  submitHandler: SubmitHandler<T>;
}

export const FormWrapper = <T extends FieldValues>({
  children,
  schema,
  defaultValues,
  submitHandler,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({
    mode: 'onSubmit',
    resolver: yupResolver(schema) as any,
    shouldFocusError: false,
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<T> = (data) => submitHandler(data);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') return handleSubmit(onSubmit);
  };

  return (
    <RHFFormProvider
      methods={methods}
      onKeyDown={onKeyDown}
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
    </RHFFormProvider>
  );
};
