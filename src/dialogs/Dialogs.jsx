import { useDialog } from "../DialogContext";
import DialogWrapper from "./DialogWrapper";
import UpdatePetDialog from "./UpdatePetDialog";
import DeletePetDialog from './DeletePetDialog';
import UpdatePostDialog from "./UpdatePostDialog";
import DeletePostDialog from "./DeletePostDialog";
import AlertDialog from "./AlertDialog";
import AddOrderDialog from "./AddOrderDialog";

const dialogs = {
  UpdatePetDialog,
  DeletePetDialog,
  UpdatePostDialog,
  DeletePostDialog,
  AlertDialog,
  AddOrderDialog
};

const Dialogs = () => {
  const { currentDialog, dialogProps, closeDialog } = useDialog();

  if (!currentDialog) return null;

  const DialogComponent = dialogs[currentDialog];
  if (!DialogComponent) return null;

  return (
    <DialogWrapper onClose={closeDialog}>
      <DialogComponent {...dialogProps} />
    </DialogWrapper>
  );
};

export default Dialogs;