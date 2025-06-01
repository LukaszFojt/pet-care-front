import React from "react";
import { useDialog } from "../DialogContext";

const DeletePetDialog = ({ petId, onConfirm }) => {
  const { closeDialog } = useDialog();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(petId);
    }
    closeDialog();
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this pet?</h2>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={closeDialog}
        >
          Close
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default DeletePetDialog;
