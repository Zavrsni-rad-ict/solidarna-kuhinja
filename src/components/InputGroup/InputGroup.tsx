import React, { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

type Props = {
  label?: string;
  /** @default type="text" */
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  control?: Control<any>;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputGroup = (props: Props) => {
  const { label, placeholder, type = 'text', name, ...inputProps } = props;
  // TODO ??
  // const { control } = useFormContext();

  return (
    <div className="relative my-7">
      <Controller
        name={name}
        // control={control}
        defaultValue="" // This line solves warning ->  component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More ....
        render={({ field, fieldState: { error } }) => (
          <>
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                {label}
              </label>
            )}

            <input
              {...field}
              {...inputProps}
              type={type}
              id={name}
              className="block w-full shadow-sm rounded-md border-0 py-1.5 pl-3 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={placeholder}
            />
            {error && (
              <span className="absolute flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                {error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

InputGroup.displayName = 'InputGroup';
