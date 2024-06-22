import { ReactNode } from 'react';
// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  onKeyDown?: (e: any) => void;
};

export const RHFFormProvider = ({
  children,
  onSubmit,
  methods,
  onKeyDown,
}: Props) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onKeyDown={onKeyDown}>
        {children}
      </form>
    </Form>
  );
};
