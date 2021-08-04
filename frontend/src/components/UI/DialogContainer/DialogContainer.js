import React from 'react';
import {Dialog} from "@material-ui/core";


const DialogContainer = ({handleClose, open, style, children}) => {
  return (
    <Dialog
      disableScrollLock
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style
      }} open={open} onClose={handleClose}>
      {children}
    </Dialog>
  );
};

export default DialogContainer;