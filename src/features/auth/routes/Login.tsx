import { AuthLayout } from '@/components/Layout';

import { LoginForm } from '../components';

export const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

Login.displayName = 'Login';
