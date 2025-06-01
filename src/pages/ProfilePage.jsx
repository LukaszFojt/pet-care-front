import { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AccountNav } from "../components";
import { UserContext } from "../UserContext";
import api from "../api";
import { useTranslation } from "../TranslationContext";
import { useDialog } from "../DialogContext";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready, userInfo, updateUserInfo } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState("");
  const { t } = useTranslation();
  const { openAlert } = useDialog();

  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  useEffect(() => {
    if (ready && user && userInfo) {
      setProfile({
        id: userInfo.id,
        userId: userInfo.userId,
        email: user.email || "",
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        age: userInfo.age || 0,
        initials: userInfo.initials || "",
        street: userInfo.street || "",
        houseNumber: userInfo.houseNumber || 0,
        city: userInfo.city || "",
        region: userInfo.region || "",
        postalCode: userInfo.postalCode || "",
        country: userInfo.country || "",
        phoneNumber: userInfo.phoneNumber || "",
        picturePath: userInfo.picturePath || "",
        description: userInfo.description || "",
        stars: userInfo.stars || 0,
        completedOrders: userInfo.completedOrders || 0,
      });
      setImage(userInfo.picturePath || "");
    }
  }, [ready, user, userInfo]);

  async function logout() {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.log("Logout failed", error);
    }
  }

  const handleSave = async () => {
    if (userInfo && userInfo.userId) {
      await updateUserInfo(userInfo.userId, profile);
      openAlert(t("Profile updated successfully!"));
    } else {
      console.error("User ID is missing.");
    }
  };

  if (!ready) return <div>{t("Loading...")}</div>;
  if (ready && !user && !redirect) return <Navigate to="/login" />;
  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6">
      <AccountNav />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-4 mb-6">
          {image ? (
            <img
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
              src={`http://localhost:5000${image}`}
              alt="Profile"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              {t("No Image")}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">{t("Account Information")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input" type="text" placeholder={t("First Name")} value={profile.firstName} onChange={e => setProfile({ ...profile, firstName: e.target.value })} />
          <input className="input" type="text" placeholder={t("Last Name")} value={profile.lastName} onChange={e => setProfile({ ...profile, lastName: e.target.value })} />
          <input className="input" type="text" placeholder={t("Email")} value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
          <input className="input" type="number" placeholder={t("Age")} value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} />
          <input className="input" type="text" placeholder={t("Initials")} value={profile.initials} onChange={e => setProfile({ ...profile, initials: e.target.value })} />
          <input className="input" type="text" placeholder={t("Street")} value={profile.street} onChange={e => setProfile({ ...profile, street: e.target.value })} />
          <input className="input" type="number" placeholder={t("House Number")} value={profile.houseNumber} onChange={e => setProfile({ ...profile, houseNumber: e.target.value })} />
          <input className="input" type="text" placeholder={t("City")} value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} />
          <input className="input" type="text" placeholder={t("Region")} value={profile.region} onChange={e => setProfile({ ...profile, region: e.target.value })} />
          <input className="input" type="text" placeholder={t("Postal Code")} value={profile.postalCode} onChange={e => setProfile({ ...profile, postalCode: e.target.value })} />
          <input className="input" type="text" placeholder={t("Country")} value={profile.country} onChange={e => setProfile({ ...profile, country: e.target.value })} />
          <input className="input" type="text" placeholder={t("Phone Number")} value={profile.phoneNumber} onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })} />
          <input className="input" type="text" placeholder={t("Description")} value={profile.description} onChange={e => setProfile({ ...profile, description: e.target.value })} />
          <input className="input" type="number" placeholder={t("Stars")} value={profile.stars} onChange={e => setProfile({ ...profile, stars: e.target.value })} />
          <input className="input" type="number" placeholder={t("Completed Orders")} value={profile.completedOrders} onChange={e => setProfile({ ...profile, completedOrders: e.target.value })} />
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button className="primary rounded-full w-48" onClick={handleSave}>
            {t("Save Changes")}
          </button>
          <button className="secondary rounded-full w-48" onClick={logout}>
            {t("Logout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
