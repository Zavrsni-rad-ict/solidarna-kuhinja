import logoPath from '@/assets/logo.png';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-50">
      <div className="min-h-screen flex flex-col justify-center items-center mx-3 gap-4">
        <div className={'logo__wrapper animate-fade-in-down'}>
          <img src={logoPath} alt="Logo" width={196} />
        </div>
        <div className="form__wrapper max-w-96 w-full bg-slate-200 p-5 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
