import { markAsRead } from "../services/notificationService";

function NotificationCard({ notification, refresh }) {
  const handleRead = async () => {
    if (notification.isRead) return;

    try {
      await markAsRead(notification._id);
      refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div
    className={`flex items-start gap-4 border-b border-slate-200 px-5 py-4 transition-all duration-200 hover:bg-slate-50 ${
      !notification.isRead ? "bg-emerald-50/60" : "bg-white"
    }`}
  >
    {/* Notification Icon */}
    <div
      className={`mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
        notification.isRead
          ? "bg-slate-100"
          : "bg-emerald-100"
      }`}
    >
      🔔
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">

      <div className="flex items-center justify-between gap-3">

        <h3 className="font-semibold text-slate-800 truncate">
          {notification.title}
        </h3>

        <span className="text-xs whitespace-nowrap text-slate-500">
          {new Date(notification.createdAt).toLocaleString()}
        </span>

      </div>

      <p className="mt-1 text-sm leading-6 text-slate-600">
        {notification.message}
      </p>

      {!notification.isRead && (
        <button
          onClick={handleRead}
          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Mark as Read
        </button>
      )}

    </div>

    {!notification.isRead && (
      <div className="mt-2 h-3 w-3 rounded-full bg-emerald-500"></div>
    )}
  </div>
);
}

export default NotificationCard;