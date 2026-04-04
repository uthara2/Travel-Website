import { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationsPage.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      fetchNotifications(parsedUser._id);
    }
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const res = await axios.get(
        `https://travel-website-lm4n.onrender.com/api/taxi/notifications/${userId}`
      );
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `https://travel-website-lm4n.onrender.com/api/taxi/notifications/${id}`
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `https://travel-website-lm4n.onrender.com/api/taxi/notifications/${id}`
      );

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notifications-page">
      <h2>Your Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`notification-card ${n.read ? "" : "unread"}`}
          >
            <p onClick={() => markAsRead(n._id)}>
              {n.message}
            </p>

            <button onClick={() => deleteNotification(n._id)}>
              Clear
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsPage;