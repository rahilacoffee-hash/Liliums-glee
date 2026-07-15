import { useState } from "react";
import { Ban, CheckCircle2, Trash2 } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let roleStyles = {
  ADMIN: "bg-[#C8A96A]/20 text-[#8a6d3b]",
  USER: "bg-[#F0EDE6] text-[#666]",
};

let statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-[#F0EDE6] text-[#777]",
  Suspended: "bg-red-100 text-red-600",
};

function UserTable({ users, onUserUpdated, onUserDeleted, currentUserId }) {
  let [actioningId, setActioningId] = useState(null);
  let [confirmDeleteId, setConfirmDeleteId] = useState(null);

  async function handleToggleStatus(user) {
    let newStatus = user.status === "Suspended" ? "Active" : "Suspended";
    setActioningId(user._id);

    try {
      await axiosInstance.put(`/user/${user._id}/status`, { status: newStatus });
      onUserUpdated(user._id, { status: newStatus });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user status");
    } finally {
      setActioningId(null);
    }
  }

  async function handleDelete(userId) {
    setActioningId(userId);

    try {
      await axiosInstance.delete(`/user/${userId}`);
      onUserDeleted(userId);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    } finally {
      setActioningId(null);
      setConfirmDeleteId(null);
    }
  }

  if (!users.length) {
    return (
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8E2D9] bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#E8E2D9] text-xs uppercase tracking-[1px] text-[#999]">
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Mobile</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Verified</th>
            <th className="px-5 py-4">Joined</th>
            <th className="px-5 py-4">Last Login</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            let isSelf = user._id === currentUserId;
            let isBusy = actioningId === user._id;

            return (
              <tr key={user._id} className="border-b border-[#E8E2D9] transition last:border-0 hover:bg-[#F8F5F0]">
                <td className="px-5 py-4 font-medium text-[#111111]">
                  {user.name} {isSelf && <span className="text-xs text-[#999]">(you)</span>}
                </td>
                <td className="px-5 py-4 text-[#666]">{user.email}</td>
                <td className="px-5 py-4 text-[#666]">{user.mobile || "—"}</td>

                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${roleStyles[user.role] || roleStyles.USER}`}>
                    {user.role}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[user.status] || statusStyles.Active}`}>
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  {user.verify_email ? (
                    <span className="text-xs font-medium text-green-600">Verified</span>
                  ) : (
                    <span className="text-xs font-medium text-[#999]">Unverified</span>
                  )}
                </td>

                <td className="px-5 py-4 text-[#666]">
                  {new Date(user.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                </td>

                <td className="px-5 py-4 text-[#666]">
                  {user.last_login_date
                    ? new Date(user.last_login_date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
                    : "Never"}
                </td>

                <td className="px-5 py-4">
                  {isSelf ? (
                    <span className="text-xs text-[#ccc]">—</span>
                  ) : confirmDeleteId === user._id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={isBusy}
                        className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                      >
                        {isBusy ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-full border border-[#E8E2D9] px-3 py-1.5 text-xs font-medium text-[#666] transition hover:border-[#999]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        disabled={isBusy}
                        title={user.status === "Suspended" ? "Unblock user" : "Block user"}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] transition hover:border-[#C8A96A] hover:text-[#C8A96A] disabled:opacity-60"
                      >
                        {user.status === "Suspended" ? <CheckCircle2 size={15} /> : <Ban size={15} />}
                      </button>

                      <button
                        onClick={() => setConfirmDeleteId(user._id)}
                        title="Delete user"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] transition hover:border-red-400 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;