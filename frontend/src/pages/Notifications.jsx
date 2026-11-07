import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { getMyNotifications } from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data.notifications);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
  <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
    <div className="mx-auto max-w-5xl">

      {/* Header */}

      <div className="mb-6">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Notifications 🔔
        </h1>

        <p className="mt-2 text-slate-500">
          Stay updated with your latest activities and appointment alerts.
        </p>

      </div>

      {/* Notification List */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

        {notifications.length === 0 ? (

          <div className="flex flex-col items-center justify-center px-6 py-16">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-5xl">
              🔔
            </div>

            <h2 className="text-2xl font-bold text-slate-700">
              No Notifications
            </h2>

            <p className="mt-2 text-center text-slate-500">
              You're all caught up. New notifications will appear here.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-slate-200">

            {notifications.map((notification) => (

              <NotificationCard
                key={notification._id}
                notification={notification}
                refresh={fetchNotifications}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  </div>
);
}

export default Notifications;