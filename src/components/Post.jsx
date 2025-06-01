import { useEffect, useState } from "react";
import api from "../api";
import { DateTime } from "luxon";
import { useTranslation } from "../TranslationContext";
import { useDialog } from "../DialogContext";
import { AccountNav } from "../components";
import { BetterSelect } from "./elements";

const Post = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [userId, setUserId] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { t } = useTranslation();
  const { openDialog, openAlert } = useDialog();
  const [condition, setCondition] = useState(1);
  const [conditions, setConditions] = useState([]);
  const [service, setService] = useState(1);
  const [animal, setAnimal] = useState(1);
  const [city, setCity] = useState(1);

  const serviceOptions = [
    { id: 1, name: t("All services") },
    { id: 2, name: t("Accomodation") },
    { id: 3, name: t("Home visit") },
    { id: 4, name: t("Walk") },
  ];

  const animalOptions = [
    { id: 1, name: t("All pets") },
    { id: 2, name: t("Dog") },
    { id: 3, name: t("Cat") },
  ];

  const cityOptions = [
    { id: 1, name: t("All cities") },
    { id: 2, name: t("Warsaw") },
    { id: 3, name: t("Łódź") },
    { id: 4, name: t("Wrocław") },
    { id: 5, name: t("Poznań") },
    { id: 6, name: t("Gdańsk") },
    { id: 7, name: t("Szczecin") },
    { id: 8, name: t("Bydgoszcz") },
    { id: 9, name: t("Lublin") },
    { id: 10, name: t("Białystok") },
    { id: 11, name: t("Katowice") },
    { id: 12, name: t("Gdynia") },
    { id: 13, name: t("Częstochowa") },
    { id: 14, name: t("Rzeszów") },
    { id: 15, name: t("Radom") },
    { id: 16, name: t("Toruń") },
    { id: 17, name: t("Sosnowiec") },
    { id: 18, name: t("Kielce") },
    { id: 19, name: t("Gliwice") },
    { id: 20, name: t("Olsztyn") },
    { id: 21, name: t("Bielsko-Biała") },
    { id: 22, name: t("Zabrze") },
    { id: 23, name: t("Bytom") },
    { id: 24, name: t("Zielona Góra") },
    { id: 25, name: t("Rybnik") },
    { id: 26, name: t("Ruda Śląska") },
    { id: 27, name: t("Opole") },
    { id: 28, name: t("Tychy") },
    { id: 29, name: t("Gorzów Wielkopolski") },
    { id: 30, name: t("Dąbrowa Górnicza") },
    { id: 31, name: t("Elbląg") },
    { id: 32, name: t("Płock") },
    { id: 33, name: t("Koszalin") },
    { id: 34, name: t("Tarnów") },
    { id: 35, name: t("Wałbrzych") },
    { id: 36, name: t("Włocławek") },
    { id: 37, name: t("Chorzów") },
    { id: 38, name: t("Kraków") },
  ];

  useEffect(() => {
    fetchUser();
    getConditions();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserPosts();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const result = await api.get('/users/current', { withCredentials: true });
      if (result.data.id)
        setUserId(result.data.id);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  async function addPost(ev) {
    ev.preventDefault();
    try {
      if (!userId || !image) return;

      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Description', description);
      formData.append('Created', new Date().toISOString());
      formData.append('Updated', new Date().toISOString());
      formData.append('UserId', userId);
      formData.append('ImageFile', image);

      var serviceInput = {
        id: 1,
        name: "Services",
        description: service,
      }
      var animalInput = {
        id: 2,
        name: "Animals",
        description: animal,
      }
      var cityInput = {
        id: 3,
        name: "Cities",
        description: city,
      }
      await setConditionToUserTies(serviceInput, userId);
      await setConditionToUserTies(animalInput, userId);
      await setConditionToUserTies(cityInput, userId);

      await api.post('/posts/addPostWithImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      openAlert(t("Post added successfully!"));
      getUserPosts();
    } catch (e) {
      openAlert(t("An error occurred while adding the post."));
      console.error(e);
    }
  }

  const openEditPostDialog = (post) => {
    openDialog("UpdatePostDialog", {
      post,
      onSave: async (formData) => {
        await api.put(`/posts/updatePostWithImage`, formData, {
          headers: { 
            "Content-Type": "multipart/form-data" 
          },
        });
        getUserPosts();
      },
    });
  };

  const openDeletePostDialog = (postId) => {
    openDialog("DeletePostDialog", {
      postId,
      onConfirm: async (id) => {
        try {
          await api.delete(`/posts/delete/${id}`);
          openAlert(t("Post deleted successfully!"));
          getUserPosts();
        } catch (e) {
          openAlert(t("An error occurred while deleting the post."));
          console.error(e);
        }
      },
    });
  };

  async function getUserPosts() {
    try {
      if (!userId) return;
      const response = await api.get(`/posts/allByUserId/${userId}`);
      setUserPosts(response.data);
    } catch (e) {
      console.error("Listing posts failed:", e);
    }
  }

  async function getConditions() {
    try {
      const response = await api.get(`/conditions/getAll`);
      setConditions(response.data);
      console.log(response.data);
    } catch (e) {
      console.error("Listing conditions failed:", e);
    }
  }

  async function setConditionToUserTies(condition, userId) {
    await api.post(`/conditionToUserTies/add`, {
      name: condition.name,
      description: String(condition.description),
      conditionId: condition.id,
      userId: userId,
    });
  }

  function getFormattedDate(date) {
    return DateTime.fromISO(date).toFormat("dd.MM.yyyy, HH:mm");
  }

  return (
    <div>
      <AccountNav />
      <div className="p-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
        <form className='max-w-md mx-auto text-black' onSubmit={addPost}>
          <input placeholder={t("Name")} value={name} onChange={ev => setName(ev.target.value)} className="input-field mb-2" />
          <input type="file" onChange={ev => setImage(ev.target.files[0])} accept="image/*" className="input-field mb-2" />
          <textarea placeholder={t("Content")} value={description} onChange={ev => setDescription(ev.target.value)} className="input-field mb-2" />
          <div>{t("Conditions")}:</div>

          {conditions.map((cond, index) => (
            <div key={`${cond.id}-${index}`} className="mb-4">
              {cond.name === "Services" && (
                <BetterSelect
                  options={serviceOptions}
                  value={service}
                  onChange={val => setService(val)}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                />
              )}
              {cond.name === "Animals" && (
                <BetterSelect
                  options={animalOptions}
                  value={animal}
                  onChange={val => setAnimal(val)}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                />
              )}
              {cond.name === "Cities" && (
                <BetterSelect
                  options={cityOptions}
                  value={city}
                  onChange={val => setCity(val)}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                />
              )}
            </div>
          ))}
          
          <button className='primary'>{ t("Add new post") }</button>
        </form>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">{ t("Your posts") }:</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post.id} className="border p-4 mt-4 rounded shadow-sm">
                <div className="flex justify-between mb-2">
                  <div className="text-xl font-bold">{post.name}</div>
                  <div className="flex gap-2">
                    <button className="button accent-button icon-button icons" onClick={() => openEditPostDialog(post)}>edit</button>
                    <button className="button delete-button icon-button icons" onClick={() => openDeletePostDialog(post.id)}>delete</button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div>{t("Created at")}: {getFormattedDate(post.created)}</div>
                  <div>{t("Updated at")}: {getFormattedDate(post.updated)}</div>
                </div>
                <p className="mb-2">{post.description}</p>
                <img src={`http://localhost:5000${post.imagePath}`} alt="Post" className="rounded-lg max-h-60 object-cover" />
              </div>
            ))
          ) : (
            <p className="text-gray-500">{ t("No posts found") }.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
