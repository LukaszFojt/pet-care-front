import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import api from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);
  const { setUser } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/users/current', { withCredentials: true });
      setUser(data);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const result = await api.post('/login?useCookies=true&useSessionCookies=true', { email, password }, { withCredentials: true });
      setUser(result.data);
      openAlert(t("Login successful."));
      await fetchUser();
      setRedirect("/account");
    } catch (e) {
      openAlert(t("Login failed."));
      console.error(e);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="w-full h-fit flex flex-col gap-12">
      <div></div>
      <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
          <h1 className='text-4xl text-center mb-4'>Login</h1>
          <form className='max-w-md mx-auto text-black' onSubmit={loginUser}>
            <input type="email" placeholder={"your@email.com"} value={email} onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button className='primary'>Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet? 
              <Link to={'/register'} className='underline text-black'> Register now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
