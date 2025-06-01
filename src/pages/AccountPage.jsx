import { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AccountNav } from "../components";
import { UserContext } from "../UserContext";
import api from "../api";
import { useTranslation } from "../TranslationContext";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready, userInfo, updateUserInfo } = useContext(UserContext);
  const { t } = useTranslation();

  let { subpage } = useParams();
  if (subpage === undefined) subpage = "account";

  async function logout() {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.log("Logout failed", error);
    }
  }

  if (!ready) return <div>{t("Loading...")}</div>;
  if (ready && !user && !redirect) return <Navigate to="/login" />;
  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6">
      <AccountNav />
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
            <div className="flex gap-4 justify-center">
                <button className="secondary rounded-full w-48" onClick={logout}>
                {t("Logout")}
                </button>
            </div>
        </div>
    </div>
  );
};

export default AccountPage;
