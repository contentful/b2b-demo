'use client';

import React from 'react';

type AppContextType = {
  state: AppContextState;
  updateState: (arg: AppContextState) => void;
  logout: () => void;
};

export type AppContextState = {
  currentLocale: string;
  currentOrgUnit: string;
  currentUser: string;
  currentUserRoles: Array<string>;
};

const AppContext = React.createContext<AppContextType>({
  state: {
    currentLocale: '',
    currentOrgUnit: '',
    currentUser: '',
    currentUserRoles: new Array(),
  },
  updateState: (state: AppContextState) => null,
  logout: () => null,
});

const defaultState = {
  currentLocale: '',
  currentOrgUnit: '',
  currentUser: '',
  currentUserRoles: new Array(),
};

const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    const savedState = sessionStorage.getItem('cf-b2b-state');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  const logout = () => {
    setState(defaultState);
    sessionStorage.removeItem('cf-b2b-state');
  };

  const updateState = (newState: AppContextState) => {
    setState(newState);
    sessionStorage.setItem('cf-b2b-state', JSON.stringify(newState));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        logout,
        updateState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  return React.useContext(AppContext);
};

export default useAppContext;
export { AppContext, AppProvider };
