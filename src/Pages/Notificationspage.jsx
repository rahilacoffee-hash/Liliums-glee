import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, CalendarDays, MessageSquare, Users, Package, Bell, CheckCheck, Trash2 } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

let typeConfig = {
  order: { icon: ShoppingCart, color: "text-[#C8A96A] bg-[#C8A96A]/10" },
  consultation: { icon: CalendarDays, color: "text-blue-600 bg-blue-50" },
  review: { icon: MessageSquare, color: "text-purple-600 bg-purple-50" },
  user: { icon: Users, color: "text-green-600 bg-green-50" },
  product: { icon: Package, color: "text-orange-600 bg-orange-50" },
  system: { icon: Bell, color: "text-gray-500 bg-gray-100" },
};

let filterOptions = ["all", "unread", "read"];

function timeAgo(dateString) {
  let seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

  let intervals = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
  ];

  for (let { label, secs } of intervals) {
    let count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }

  return "Just now";
}

function NotificationsPage() {
  let navigate = useNavigate();
  let [notifications, setNotifications] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [filter, setFilter] = useState("all");
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, [filter, page]);

  async function fetchNotifications() {
    setLoading(true);
    setError("");

    try {
      let { data } = await axiosInstance.get("/notification", { params: { filter, page, limit: 20 } });
      setNotifications(data.data.notifications);
      setTotalPages(data.data.totalPages);
      setUnreadCount(data.data.unreadCount);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  async function handleClick(notification) {
    if (!notification.isRead) {
      try {
        await axiosInstance.put(`/notification/${notification._id}/read`);
        setNotifications((prev) => prev.map((n) => (n._id === notification._id ? { ...n, isRead: true } : n)));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error(err);
      }
    }

    if (notification.link) {
      navigate(notification.link);
    }
  }

  async function handleMarkAllRead() {
    try {
      await axiosInstance.put("/notification/mark-all-read");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark all as read");
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/notification/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete notification");
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">Notifications</h1>
          <p className="mt-1 text-sm text-[#777]">{unreadCount} unread</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full border border-[#E8E2D9] bg-white p-1">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                  filter === f ? "bg-[#C8A96A] text-black" : "text-[#666] hover:text-[#111111]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 rounded-full border border-[#E8E2D9] bg-white px-4 py-2 text-sm font-medium text-[#666] transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
            >
              <CheckCheck size={15} /> Mark all as read
            </button>
          )}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
          No {filter !== "all" ? filter : ""} notifications.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
          {notifications.map((n, i) => {
            let config = typeConfig[n.type] || typeConfig.system;
            let Icon = config.icon;

            return (
              <div
                key={n._id}
                onClick={() => handleClick(n)}
                className={`flex cursor-pointer items-start gap-4 border-b border-[#E8E2D9] p-5 transition last:border-0 hover:bg-[#F8F5F0] ${
                  !n.isRead ? "bg-[#C8A96A]/[0.04]" : ""
                }`}
              >
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${config.color}`}>
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#111111]">{n.title}</p>
                    {!n.isRead && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C8A96A]" />}
                  </div>
                  <p className="mt-1 text-sm text-[#666]">{n.message}</p>
                  <p className="mt-1.5 text-xs text-[#999]">{timeAgo(n.createdAt)}</p>
                </div>

                <button
                  onClick={(e) => handleDelete(n._id, e)}
                  className="flex-shrink-0 text-[#ccc] transition hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-full text-sm transition ${
                page === i + 1 ? "bg-[#C8A96A] text-black" : "border border-[#E8E2D9] text-[#666] hover:border-[#C8A96A]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;