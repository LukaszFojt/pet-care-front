import { useEffect, useState } from "react";
import api from "../api";
import { useTranslation } from "../TranslationContext";
import { BetterSelect } from "./elements";
import { useDialog } from "../DialogContext";
import { AccountNav } from "../components";

const Pet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState(1);
  const [sex, setSex] = useState(0);
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const { t } = useTranslation();
  const { openDialog, openAlert } = useDialog();

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

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) getUserPets();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const result = await api.get("/users/current", { withCredentials: true });
      if (result.data.id) setUserId(result.data.id);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  async function addPet(ev) {
    ev.preventDefault();
    try {
      if (!userId || !image) return;

      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Description", description);
      formData.append("Age", age);
      formData.append("Size", size);
      formData.append("Sex", sex);
      formData.append("UserId", userId);
      formData.append("ImageFile", image);

      await api.post("/pets/addPetWithImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      openAlert(t("Pet added successfully!"));
      getUserPets();
    } catch (e) {
      openAlert(t("An error occurred while adding the pet."));
      console.error(e);
    }
  }

  const openEditPetDialog = (pet) => {
    openDialog("UpdatePetDialog", {
      pet,
      onSave: async (formData) => {
        await api.put(`/pets/updatePetWithImage`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        getUserPets();
      },
    });
  };

  const openDeletePetDialog = (petId) => {
    openDialog("DeletePetDialog", {
      petId,
      onConfirm: async (id) => {
        try {
          await api.delete(`/pets/delete/${id}`);
          openAlert(t("Pet deleted successfully!"));
          getUserPets();
        } catch (e) {
          openAlert(t("An error occurred while deleting the pet."));
          console.error(e);
        }
      },
    });
  };

  async function getUserPets() {
    try {
      if (!userId) return;
      const response = await api.get(`/pets/allByUserId/${userId}`);
      setUserPets(response.data);
    } catch (e) {
      console.error("Listing pets failed:", e);
    }
  }

  function getSizeName(id) {
    const option = sizeOptions.find((opt) => opt.id === id);
    return option ? option.name : "";
  }

  function getSexName(id) {
    const option = sexOptions.find((opt) => opt.id === id);
    return option ? option.name : "";
  }

  return (
    <div>
      <AccountNav />
      <div className="p-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
        <form className="text-black space-y-4" onSubmit={addPet}>
          <h2 className="text-2xl font-bold mb-4">{t("Add a new pet")}</h2>

          <input className="input-field" placeholder={t("Name")} value={name} onChange={(ev) => setName(ev.target.value)} />
          <input className="input-field" type="file" onChange={(ev) => setImage(ev.target.files[0])} accept="image/*" />
          <input className="input-field" type="number" placeholder={t("Age")} value={age} onChange={(ev) => setAge(ev.target.value)} />

          <BetterSelect
            options={sizeOptions}
            value={size}
            onChange={setSize}
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id}
          />

          <BetterSelect
            options={sexOptions}
            value={sex}
            onChange={setSex}
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id}
          />

          <textarea className="input-field" placeholder={t("Description")} value={description} onChange={(ev) => setDescription(ev.target.value)} />

          <button className="primary">{t("Add new pet")}</button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">{t("Your pets")}:</h2>
          {userPets.length > 0 ? (
            userPets.map((pet) => (
              <div key={pet.id} className="border p-4 mt-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-xl font-semibold">{pet.name}</div>
                    <div className="text-sm text-gray-500">{getSizeName(pet.size)} • {getSexName(pet.sex)} • {t("Age")}: {pet.age}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="button accent-button icon-button icons" onClick={() => openEditPetDialog(pet)}>
                      edit
                    </button>
                    <button className="button delete-button icon-button icons" onClick={() => openDeletePetDialog(pet.id)}>
                      delete
                    </button>
                  </div>
                </div>
                <p className="mb-2">{pet.description}</p>
                <img src={`http://localhost:5000${pet.imagePath}`} alt="Pet" className="max-h-60 rounded-md" />
              </div>
            ))
          ) : (
            <p className="text-gray-600">{t("No pets found")}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pet;
