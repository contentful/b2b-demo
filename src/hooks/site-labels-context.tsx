import React from 'react';

type SiteLabelsContextType = {
  siteLabels: Record<string, any>;
  setSiteLabels: (arg0: Record<string, any>) => void;
};

const SiteLabelsContext = React.createContext<SiteLabelsContextType | null>(
  null
);

const SiteLabelsProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteLabels, setSiteLabels] = React.useState<Record<string, any>>({});

  return (
    <SiteLabelsContext.Provider value={{ siteLabels, setSiteLabels }}>
      {children}
    </SiteLabelsContext.Provider>
  );
};

const useSiteLabels = () => {
  const context = React.useContext(SiteLabelsContext);
  if (!context) {
    throw new Error('useLabels can only be used inside a LabelsProvider');
  }
  return context;
};

export default useSiteLabels;
export { SiteLabelsContext, SiteLabelsProvider };
