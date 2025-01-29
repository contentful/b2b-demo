'use client';

import { AppProvider } from './app-context';
import { CartsProvider } from './carts-context';
import { SiteConfigProvider } from './site-config-context';
import { SiteLabelsProvider } from './site-labels-context';
import { ThemeProvider } from '@material-tailwind/react';

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <AppProvider>
      <SiteConfigProvider>
        <SiteLabelsProvider>
          <ThemeProvider>
            <CartsProvider>{children}</CartsProvider>
          </ThemeProvider>
        </SiteLabelsProvider>
      </SiteConfigProvider>
    </AppProvider>
  );
};

export default Providers;
