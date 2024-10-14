import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  label?: string;
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'>;
  selectProps?: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>;
  children: React.ReactNode;
  name: string;
  control?: Control<any>;
};

export const Dropdown = ({
  label,
  labelProps,
  children,
  selectProps,
  name,
  control,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <>
          {label && (
            <label
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelProps?.className}`}
              {...labelProps}
            >
              {label}
            </label>
          )}
          <select
            {...field}
            {...selectProps}
            id={name}
            className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${selectProps?.className}`}
          >
            <option value="" disabled>
              Choose a role
            </option>
            {children}
          </select>
          {error && (
            <span className="absolute flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
              {error.message}
            </span>
          )}
        </>
      )}
    />
  );
};

Dropdown.displayName = 'Dropdown';
