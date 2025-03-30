import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

/**
 * Hook that provides a delete dialog component and a way to open it.
 *
 * The hook returns an object with two properties:
 * - `handleDeleteOpen`: a function that takes a callback as an argument and
 *   opens the delete dialog. The callback is called when the dialog is confirmed.
 * - `DeleteDialog`: a component that renders the delete dialog.
 */
export const useDeleteDialog = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [callbackOnClose, setCallbackOnClose] = useState<() => () => void>();

  /**
   * Opens the delete dialog with the provided callback.
   * The callback is called when the dialog is confirmed.
   */
  const handleDeleteOpen = (callback: () => void) => {
    setOpenDelete(true);
    setCallbackOnClose(() => callback);
  };

  /**
   * Closes the dialog and calls the callback that was passed to `handleDeleteOpen`.
   */
  const handleDeleteConfirm = () => {
    if (callbackOnClose) callbackOnClose();
    setOpenDelete(false);
  };
  /**
   * Closes the dialog without calling the callback.
   */
  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  return {
    handleDeleteOpen,
    DeleteDialog: () => (
      <Dialog open={openDelete} onClose={handleDeleteCancel}>
        <DialogTitle>
          Are you sure you want to delete this snapshot?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ),
  };
};
