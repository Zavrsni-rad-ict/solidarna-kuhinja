import IconMagnifyingGlass from '@/assets/magnifying-glass.svg?react';
import { InputHTMLAttributes } from 'react';

export const SearchBar = ({
  onChange,
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative w-full sm:w-auto md:max-w-[320px]">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <IconMagnifyingGlass />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Find users"
        onChange={onChange}
      />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
