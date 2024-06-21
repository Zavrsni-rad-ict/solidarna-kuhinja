import { InputGroup } from '@/components/InputGroup/InputGroup';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loginWithEmailAndPassword } from '../api/login';

export const LoginForm = () => {
  const { t } = useTranslation('');

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    loginWithEmailAndPassword(credentials);
  };

  return (
    <div>
      <InputGroup
        label="Email"
        name="email"
        value={credentials.email}
        placeholder="username..."
        onChange={handleChange}
      />
      <InputGroup
        label="Password"
        type="password"
        name="password"
        value={credentials.password}
        placeholder="username..."
        onChange={handleChange}
      />
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';
