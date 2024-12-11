import { ButtonHTMLAttributes } from 'react';

type Variant =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'light'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'disabled'
  | 'ghost1';

type Props = {
  variant?: Variant;
  shouldCapitalizeValue?: boolean;
  type: 'submit' | 'button';
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const variants: Record<Variant, string> = {
  primary:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  secondary:
    'py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
  dark: 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
  light:
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
  green:
    'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  red: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
  purple:
    'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
  yellow:
    'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 dark:focus:ring-yellow-900',
  disabled:
    'bg-gray-500 text-white py-2 px-4 rounded opacity-50 !cursor-not-allowed text-sm font-medium px-5 py-2.5',
  ghost1:
    'py-2 px-4 me-2 mb-2 text-sm font-medium text-black focus:outline-none bg-transparent rounded-lg border border-red-200 hover:bg-red-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
};

export const Button = (props: Props) => {
  const {
    variant,
    children,
    shouldCapitalizeValue,
    type,
    className,
    ...buttonProps
  } = props;

  const selectedVariant = variant && variants[variant];

  return (
    <button
      type={type}
      className={`cursor-pointer ripple ${className || ''} ${
        selectedVariant || ''
      }`}
      {...buttonProps}
    >
      {shouldCapitalizeValue && typeof children === 'string'
        ? children.toUpperCase()
        : children}
    </button>
  );
  // return (
  //   <input
  //     type={type}
  //     value={shouldCapitalizeValue ? value.toUpperCase() : value}
  //     className={`cursor-pointer ${selectedVariant ?? ''}${
  //       inputProps.className ?? ''
  //     }`}
  //     {...inputProps}
  //   />
  // );
};

Button.displayName = 'Button';
