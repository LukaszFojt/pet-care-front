import { useEffect, useState } from "react";
import api from "../api";
import { DateTime } from "luxon";
import Card from "./elements/Card";
import { useTranslation } from "../TranslationContext";

const Posts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [userInfos, setUserInfos] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
      getPosts();
      getUserInfos();
    }, []);

    async function getPosts() {
      try {
        const response = await api.get(`/posts/getAll`);
        setUserPosts(response.data);
      } catch (e) {
        console.error("Error occured:", e);
      }
    }

    async function getUserInfos() {
      try {
        const response = await api.get(`/userInfos/getAll`);
        setUserInfos(response.data);
      } catch (e) {
        console.error("Error occured:", e);
      }
    }

    function getFormattedDate(date) {
      return DateTime.fromISO(date).toFormat("dd.MM.yyyy, HH:mm");
    }

    function getUserInfo(userId) {
      return userInfos.find(info => info.userId === userId);
    }

    return (
      <div className="full_container">
        <div className="container_vertical">

          <div className="mt-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => {
                const userInfo = getUserInfo(post.userId);

                return (
                  <div key={post.id} className="border p-2 mt-2 rounded">
                    {userInfo && (
                      <Card
                        image={`http://localhost:5000${post.imagePath}`}
                        userName={userInfo.name || userInfo.firstName + ' ' + userInfo.lastName}
                        stars={userInfo.stars}
                        completedOrders={userInfo.completedOrders}
                        city={userInfo.city}
                        price={post.price}
                      />
                    )}
                    <div className="flex gap-2 items-center mt-2">
                      <span className="text-xl font-bold">{post.name}</span>
                      <div className="flex flex-col">
                        <span>{t("Created at")}: {getFormattedDate(post.created)}</span>
                        <span>{t("Updated at")}: {getFormattedDate(post.updated)}</span>
                      </div>
                    </div>
                    <p>{post.description}</p>
                    <img
                      className="mt-2"
                      src={`http://localhost:5000${post.imagePath}`}
                      alt="Post"
                    />
                  </div>
                );
              })
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default Posts;
