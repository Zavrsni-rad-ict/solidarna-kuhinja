import React from 'react';

type Props = {
  label?: string;
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'>;
  selectProps?: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>;
  children: React.ReactNode;
};

export const Dropdown = ({
  label,
  labelProps,
  children,
  selectProps,
}: Props) => {
  return (
    <>
      <label
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelProps?.className}`}
        {...labelProps}
      >
        {label}
      </label>
      <select
        id="countries"
        className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${selectProps?.className}`}
        {...selectProps}
      >
        {children}
      </select>
    </>
  );
};

Dropdown.displayName = 'Dropdown';
