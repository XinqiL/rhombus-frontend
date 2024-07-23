import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ErrorDialog = ({ dialogOpen, setDialogOpen, apiResponse }) => {
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} className="min-w-[300px]">
      <DialogTitle>{"An Error Occurred"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {apiResponse.message} <br /> Please try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
