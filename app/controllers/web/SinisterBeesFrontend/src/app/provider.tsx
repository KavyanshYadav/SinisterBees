import React, { Suspense } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import { Notifications } from '../components/ui/Notifications/notifications';
import LoginHeader from '../components/layouts/Header/LoginHeader';

type AppProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: AppProviderProps) {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <ThemeProvider>
        <HelmetProvider>
          <LoginHeader/>
          <Notifications />
          {children}

        </HelmetProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default Provider;
