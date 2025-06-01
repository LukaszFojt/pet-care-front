import { useContext, useEffect, useState } from "react";
import api from "../api";
import { useTranslation } from "../TranslationContext";
import { useDialog } from "../DialogContext";
import { AccountNav } from "../components";
import { UserContext } from "../UserContext";

const Order = () => {
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const { t } = useTranslation();
  const { openDialog, openAlert } = useDialog();
  const { user, setUser, ready, userInfo, updateUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) getUserOrders();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const result = await api.get("/users/current", { withCredentials: true });
      if (result.data.id) setUserId(result.data.id);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  async function getUserOrders() {
    try {
      if (!userId) return;
      const response = await api.get(`/orders/allByUserId/${userId}`);
      setUserOrders(response.data);
    } catch (e) {
      console.error("Listing orders failed:", e);
    }
  }

  return (
    <div>
      <AccountNav />
      <div className="p-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">{t("Your orders")}:</h2>
          {userOrders.length > 0 ? (
            userOrders.map((order) => (
              <div key={order.id} className="border p-4 mt-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-xl font-semibold">{order.name}</div>
                  </div>
                </div>
                <p className="mb-2">{order.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">{t("No orders found")}.</p>
          )}
      </div>
    </div>
  );
};

export default Order;
