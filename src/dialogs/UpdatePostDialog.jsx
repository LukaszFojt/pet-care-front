import React, { useState } from "react";
import { useDialog } from "../DialogContext";
import { useTranslation } from "../TranslationContext";

const UpdatePostDialog = ({ post, onSave }) => {
  const { closeDialog } = useDialog();
  const { t } = useTranslation();

  const [name, setName] = useState(post?.name || "");
  const [description, setDescription] = useState(post?.description || "");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("PostId", post.id);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Created", post.created || new Date().toISOString());
    formData.append("Updated", new Date().toISOString());
    formData.append("UserId", post.userId);
    if (image) {
      formData.append("ImageFile", image);
    }

    onSave(formData);
    closeDialog();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{t("Edit post")}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("Name")}</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("Name")}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description")}</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("Description")}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("Image")}</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="w-full text-sm text-gray-500"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={closeDialog}
        >
          {t("Close")}
        </button>
        <button
          className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {t("Confirm")}
        </button>
      </div>
    </div>
  );
};

export default UpdatePostDialog;
