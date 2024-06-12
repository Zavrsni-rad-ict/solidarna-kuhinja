export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // const { t } = useTranslation('Auth');

  return (
    <div>
      <div className="logo__wrapper">
        <span>Logo</span>
      </div>
      <div className="form__wrapper">
        <h2>Welcome HC</h2>
        {children}
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
