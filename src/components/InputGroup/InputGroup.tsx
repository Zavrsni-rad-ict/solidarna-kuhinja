import React, { HTMLInputTypeAttribute } from 'react';

type Props = {
  label: string;
  /** @default type="text" */
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputGroup = (props: Props) => {
  const { label, placeholder, type = 'text', value } = props;
  return (
    <>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...props}
          type={type}
          id={label}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </>
  );
};

InputGroup.displayName = 'InputGroup';
