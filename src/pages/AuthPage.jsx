import { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import api from "../api";
import loginImage from "../assets/login-image.png";
import { useDialog } from "../DialogContext";
import { useTranslation } from "../TranslationContext";

const AuthPage = () => {
  const { setUser } = useContext(UserContext);
  const { openAlert } = useDialog();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const pageTitle = isLogin ? t("Login") : t("Register");
  const buttonText = isLogin ? t("Login") : t("Register");
  const linkText = isLogin ? t("Don't have an account yet?") : t("Already have an account?");
  const linkTo = isLogin ? "/register" : "/login";
  const linkLabel = isLogin ? t("Register now") : t("Login now");

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/users/current', { withCredentials: true });
      setUser(data);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      if (isLogin) {
        const result = await api.post('/login?useCookies=true&useSessionCookies=true', { email, password }, { withCredentials: true });
        setUser(result.data);
        openAlert(t("Login successful."));
        await fetchUser();
        setRedirect("/account");
      } else {
        await api.post('/register', { email, password });
        openAlert(t("Registration successful. Now you can log in."));
        setRedirect("/");
      }
    } catch (e) {
      if (!isLogin && e.response?.data?.errors) {
        const errorMessages = Object.values(e.response.data.errors).flat().join('\n');
        openAlert(`${t("Registration failed")}:\n${errorMessages}`);
      } else {
        openAlert(`${t(isLogin ? "Login" : "Registration")} ${t("failed. Please try again.")}`);
      }
      console.error(e);
    }
  }

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="w-1/2 hidden md:block">
        <img
          src={loginImage}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-slate-900 px-8">
        <div className="w-full max-w-md">
          <h1 className='text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white'>{pageTitle}</h1>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">{t("Email")}</label>
              <input
                type="email"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">{t("Password")}</label>
              <input
                type="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              {buttonText}
            </button>
            <p className="text-center text-gray-500 dark:text-gray-400">
              {linkText} <Link to={linkTo} className='text-blue-600 hover:underline'>{linkLabel}</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
