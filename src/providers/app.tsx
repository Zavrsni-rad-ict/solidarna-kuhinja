import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { Spinner } from '@/components/ui/spinner';
import { AuthLoader } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { MainErrorFallback } from '@/components/ErrorFallback/main';
import { I18nextProvider } from 'react-i18next';
import i18next from '@/lib/i18n';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <I18nextProvider i18n={i18next}>
              <HelmetProvider>
                {import.meta.env.DEV && <ReactQueryDevtools />}

                <AuthLoader
                  renderLoading={() => (
                    <div className="flex h-screen w-screen items-center justify-center">
                      <Spinner size="xl" />
                    </div>
                  )}
                >
                  {children}
                  <ToastContainer
                    pauseOnFocusLoss={false}
                    theme="light"
                    hideProgressBar
                    position="bottom-center"
                  />
                </AuthLoader>
              </HelmetProvider>
            </I18nextProvider>
          </Router>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
