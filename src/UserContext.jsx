import { createContext, useEffect, useState } from "react";
import api from "./api.js";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const result = await api.get('/users/current', { withCredentials: true });
      if (result.data) {
        setUser(result.data);
        fetchUserInfo(result.data.id);
      }
    } catch (e) {
      console.error("Error fetching user data:", e);
    } finally {
      setReady(true);
    }
  };

  const fetchUserInfo = async (userId) => {
    try {
      const result = await api.get(`/userInfos/getByUserId/${userId}`, {
        withCredentials: true,
      });
      if (result.data) {
        setUserInfo(result.data);
      }
    } catch (e) {
      console.error("Error fetching user info:", e);
    }
  };

  const updateUserInfo = async (userId, updatedInfo) => {
    try {
      const result = await api.put(`/userInfos/updateByUserId/${userId}`, updatedInfo);
      if (result.data) {
        setUserInfo(result.data);
        console.log("User info updated successfully");
      }
    } catch (e) {
      console.error("Error updating user info:", e);
    }
  };  
  
  return (
    <UserContext.Provider value={{ user, setUser, ready, userInfo, setUserInfo, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
