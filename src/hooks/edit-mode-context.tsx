'use client';
import React from 'react';

type EditModeContextType = {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
};

const EditModeContext = React.createContext<EditModeContextType>({
  editMode: false,
  setEditMode: (mode) => null,
});

const EditModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [editMode, setEditMode] = React.useState(false);

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

const useEditMode = () => {
  const context = React.useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used inside the EditModeProvider');
  }
  return context;
};

export default useEditMode;
export { EditModeContext, EditModeProvider };
