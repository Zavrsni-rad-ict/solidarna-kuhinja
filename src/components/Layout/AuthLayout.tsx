import logoPath from '@/assets/logo.png';
import styles from './AuthLayout.module.css';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-50">
      <div className="min-h-screen flex flex-col justify-center items-center mx-3 gap-4">
        <div
          className={`z-0 w-full h-[50vh] bg-red-800 absolute bottom-0 ${styles.background}`}
        ></div>
        <div className={'logo__wrapper animate-fade-in-down z-10'}>
          <img src={logoPath} alt="Logo" width={196} />
        </div>
        <div className="form__wrapper max-w-96 w-full bg-slate-200 p-5 rounded-lg z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
