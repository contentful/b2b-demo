import { SiteConfigType } from '@/models/content-types';
import React from 'react';

type SiteConfigContextType = {
  siteConfig: SiteConfigType;
  setSiteConfig: (c: SiteConfigType) => void;
};

const SiteConfigContext = React.createContext<SiteConfigContextType | null>(
  null
);

const SiteConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [siteConfig, setSiteConfig] = React.useState<SiteConfigType>({
    locale: '',
    siteName: '',
  });

  return (
    <SiteConfigContext.Provider value={{ siteConfig, setSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

const useSiteConfig = () => {
  const context = React.useContext(SiteConfigContext);
  if (!context) {
    throw new Error(
      'useMSiteConfig must be used inside the SiteConfigProvider'
    );
  }
  return context;
};

export default useSiteConfig;
export { SiteConfigContext, SiteConfigProvider };
