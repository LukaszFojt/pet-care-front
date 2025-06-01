import React, { useContext, useState } from "react";
import { useDialog } from "../DialogContext";
import { useTranslation } from "../TranslationContext";
import { DateTime } from "luxon";
import { UserContext } from "../UserContext";

const AddOrderDialog = ({ post, onSave }) => {
  const { closeDialog } = useDialog();
  const { t } = useTranslation();

  const [name, setName] = useState(post?.name || "");
  const [description, setDescription] = useState(post?.description || "");
  const { user, setUser, ready, userInfo, updateUserInfo } = useContext(UserContext);

  const handleSubmit = () => {
    const now = DateTime.now();
    const endDate = now.plus({ days: 7 });

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Code", `${name}_${now.toISO()}`);
    formData.append("StartDate", now.toISO());
    formData.append("EndDate", endDate.toISO());
    formData.append("EmployeeId", userInfo.userId)

    onSave(formData);
    closeDialog();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{t("Add order")}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Name")}
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("Name")}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Description")}
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("Description")}
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

export default AddOrderDialog;
