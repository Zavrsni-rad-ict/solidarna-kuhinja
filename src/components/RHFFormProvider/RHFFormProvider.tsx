import { FormEventHandler, ReactNode } from 'react';
// form
import { FormProvider, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onKeyDown?: (e: any) => void;
};

export const RHFFormProvider = ({
  children,
  onSubmit,
  methods,
  onKeyDown,
}: Props) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} onKeyDown={onKeyDown}>
        {children}
      </form>
    </FormProvider>
  );
};
