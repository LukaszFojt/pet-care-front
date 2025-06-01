import React, { useState } from "react";
import { useDialog } from "../DialogContext";
import { BetterSelect } from "../components/elements";
import { useTranslation } from "../TranslationContext";

const UpdatePetDialog = ({ pet, onSave }) => {
  const { closeDialog } = useDialog();

  const [name, setName] = useState(pet?.name || "");
  const [age, setAge] = useState(pet?.age || "");
  const [description, setDescription] = useState(pet?.description || "");
  const [size, setSize] = useState(pet?.size || 1);
  const [sex, setSex] = useState(pet?.sex || 0);
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  const sizeOptions = [
    { id: 1, name: t("Micro") },
    { id: 2, name: t("Small") },
    { id: 3, name: t("Mediocre") },
    { id: 4, name: t("Big") },
    { id: 5, name: t("Giant") },
  ];

  const sexOptions = [
    { id: 0, name: t("Female") },
    { id: 1, name: t("Male") },
  ];

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("PetId", pet.id);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Age", age);
    formData.append("Size", size);
    formData.append("Sex", sex);
    formData.append("UserId", pet.userId);
    if (image) {
      formData.append("ImageFile", image);
    }
    onSave(formData);
    closeDialog();
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Edit Pet</h2>
    <div className="field-container-horizontal">
      <div className="caption w-20">{t("Name")}:</div>
      <input
        className="mb-2 p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
    </div>
    <div className="field-container-horizontal">
        <div className="caption w-20">{t("Age")}:</div>
        <input
            className="mb-2 p-2 border rounded"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
        />
    </div>
      <div className="field-container-horizontal">
        <div className="caption w-20">{t("Size")}:</div>
        <BetterSelect
            options={sizeOptions}
            value={size}
            onChange={setSize}
            styles={{ width: "100%" }}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
        />
        </div>
        <div className="field-container-horizontal">
        <div className="caption w-20">{t("Sex")}:</div>
        <BetterSelect
            options={sexOptions}
            value={sex}
            onChange={setSex}
            styles={{ width: "100%" }}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
        />
    </div>
      <textarea
        className="mb-2 p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        className="mb-2"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="button accent-button"
          onClick={closeDialog}
        >
          Close
        </button>
        <button
          className="button accent-button"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default UpdatePetDialog;
