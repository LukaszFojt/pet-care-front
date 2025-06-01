// DialogContext.jsx
import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState(null);
  const [dialogProps, setDialogProps] = useState({});

  const openDialog = (name, props = {}) => {
    setCurrentDialog(name);
    setDialogProps(props);
  };

  const closeDialog = () => {
    setCurrentDialog(null);
    setDialogProps({});
  };

  const openAlert = (message) => {
    openDialog("AlertDialog", { message });
  };

  return (
    <DialogContext.Provider value={{
      currentDialog,
      dialogProps,
      openDialog,
      closeDialog,
      openAlert
    }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
