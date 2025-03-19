'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { AppProvider } from './app-context';
import { CartsProvider } from './carts-context';
import { EditModeProvider } from './edit-mode-context';
import { SiteConfigProvider } from './site-config-context';
import { SiteLabelsProvider } from './site-labels-context';

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <AppProvider>
      <EditModeProvider>
        <SiteConfigProvider>
          <SiteLabelsProvider>
            <ThemeProvider>
              <CartsProvider>{children}</CartsProvider>
            </ThemeProvider>
          </SiteLabelsProvider>
        </SiteConfigProvider>
      </EditModeProvider>
    </AppProvider>
  );
};

export default Providers;
