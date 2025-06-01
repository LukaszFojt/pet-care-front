import { useEffect, useState } from "react";
import api from "../api";
import connection from "../utils/signalr";
import { DateTime } from "luxon";
import { AccountNav } from "../components";
import { useTranslation } from "../TranslationContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [newMessageTitle, setNewMessageTitle] = useState("");
  const [newMessageContent, setNewMessageContent] = useState("");
  const [userId, setUserId] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [userInfos, setUserInfos] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUser();
    fetchUserInfos();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserMessages();
      fetchConversationMessages(userId, userId);
    }
  }, [userId]);

  useEffect(() => {
    connection.on("ReceiveMessage", (senderId, message) => {
      setMessages((prevMessages) => [...prevMessages, { senderId, text: message }]);
    });

    return () => {
      connection.off("ReceiveMessage");
    };
  }, []);

  const fetchUser = async () => {
    try {
      const result = await api.get("/users/current", { withCredentials: true });
      if (result.data.id) setUserId(result.data.id);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  const fetchUserInfos = async () => {
    try {
      const { data: users } = await api.get("/userInfos/getAll", {
        withCredentials: true,
      });

      setUserInfos(users);

      const recipient = users.find(user => user.email === recipientEmail);
      if (recipient) {
        setRecipientId(recipient.userId);
        fetchConversationMessages(userId, recipient.userId);
      } else {
        console.warn(`No user found with email: ${recipientEmail}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchConversationMessages = async (senderId, recipientId) => {
    try {
      const res = await api.get(`/message/getMessagesBetweenUsers?senderId=${senderId}&recipientId=${recipientId}`, {
        withCredentials: true
      });
      setConversationMessages(res.data);
    } catch (e) {
      console.error("Failed to fetch conversation messages", e);
    }
  };

  async function getUserMessages() {
    try {
      if (!userId) return;
      const response = await api.get(`/message/getByUserId/${userId}`);
      setUserMessages(response.data);
    } catch (e) {
      console.error("Listing user messages failed:", e);
    }
  }

  const getUserName = (senderId) => {
    const user = userInfos.find(u => u.userId === senderId);
    return user ? `${user.firstName} ${user.lastName}` : senderId;
  };

  const sendMessage = async () => {
    try {
      await fetchUserInfos();

      if (!recipientId) {
        console.warn("Recipient ID not found, cannot send message.");
        return;
      }

      await api.post('/chat/sendMessageToUser', {
        name: newMessageTitle,
        description: newMessageContent,
        sentAt: DateTime.now(),
        senderId: userId,
        recipientId: recipientId,
        recipients: []
      });

      setNewMessageContent("");
      getUserMessages();
      fetchConversationMessages(userId, recipientId);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="p-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">{t("Chat")}</h2>

        <div className="space-y-4">
          <input
            className="input-field"
            type="text"
            value={newMessageTitle}
            onChange={(e) => setNewMessageTitle(e.target.value)}
            placeholder={t("Enter title...")}
          />
          <input
            className="input-field"
            type="text"
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            placeholder={t("Enter message...")}
          />
          <input
            className="input-field"
            type="text"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder={t("Recipient")}
          />
          <button className="primary" onClick={sendMessage}>{t("Send")}</button>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">{t("Live messages")}</h3>
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border rounded mb-2">
              <strong>{msg.senderId}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">{t("Your messages")}</h3>
          {userMessages.map((msg, index) => (
            <div key={index} className="border p-4 rounded mb-4 shadow-sm">
              <div className="font-bold">{msg.name}</div>
              <div className="text-sm text-gray-600">{t("From")}: {getUserName(msg.senderId)}</div>
              <p>{msg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
