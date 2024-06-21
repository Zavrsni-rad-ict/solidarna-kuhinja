import { InputGroup } from '@/components/InputGroup/InputGroup';
import { AuthLayout } from '@/components/Layout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Login = () => {
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

  console.log(credentials);

  return (
    <AuthLayout>
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
    </AuthLayout>
  );
};

Login.displayName = 'Login';
