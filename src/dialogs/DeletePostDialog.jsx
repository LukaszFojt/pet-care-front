import React from "react";
import { useDialog } from "../DialogContext";
import { useTranslation } from "../TranslationContext";

const DeletePostDialog = ({ postId, onConfirm }) => {
  const { closeDialog } = useDialog();
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(postId);
    }
    closeDialog();
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4">{t("Are you sure you want to delete this post")}?</h2>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={closeDialog}
        >
          {t("Close")}
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleConfirm}
        >
          {t("Confirm")}
        </button>
      </div>
    </>
  );
};

export default DeletePostDialog;
