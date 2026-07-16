import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let statusStyles = {
  Pending: "bg-[#F0EDE6] text-[#666]",
  Contacted: "bg-[#C8A96A]/20 text-[#8a6d3b]",
  Completed: "bg-green-100 text-green-700",
};

function ConsultationTable({ consultations, onDeleted }) {
  let navigate = useNavigate();
  let [confirmDeleteId, setConfirmDeleteId] = useState(null);
  let [busyId, setBusyId] = useState(null);

  async function handleDelete(id, e) {
    e.stopPropagation();
    setBusyId(id);
    try {
      await axiosInstance.delete(`/consultation/${id}`);
      onDeleted(id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete consultation");
    } finally {
      setBusyId(null);
      setConfirmDeleteId(null);
    }
  }

  if (!consultations.length) {
    return (
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
        No consultation requests found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8E2D9] bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#E8E2D9] text-xs uppercase tracking-[1px] text-[#999]">
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4">Contact</th>
            <th className="px-5 py-4">Project</th>
            <th className="px-5 py-4">Message</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Submitted</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((c) => (
            <tr
              key={c._id}
              onClick={() => navigate(`/admin/consultations/${c._id}`)}
              className="cursor-pointer border-b border-[#E8E2D9] align-top transition last:border-0 hover:bg-[#F8F5F0]"
            >
              <td className="px-5 py-4 font-medium text-[#111111]">{c.fullName}</td>

              <td className="px-5 py-4 text-[#666]">
                <p>{c.email}</p>
                <p className="text-xs text-[#999]">{c.phone}</p>
              </td>

              <td className="px-5 py-4 text-[#666]">
                <p>{c.projectType}</p>
                <p className="text-xs text-[#999]">{c.service}</p>
              </td>

              <td className="max-w-xs px-5 py-4 text-[#666]">
                <p className="line-clamp-2">{c.message}</p>
                {c.reply && <p className="mt-1 text-xs text-green-600">✓ Replied</p>}
              </td>

              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[c.status] || statusStyles.Pending}`}>
                  {c.status}
                </span>
              </td>

              <td className="whitespace-nowrap px-5 py-4 text-[#666]">
                {new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </td>

              <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                {confirmDeleteId === c._id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(c._id, e)}
                      disabled={busyId === c._id}
                      className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                    >
                      {busyId === c._id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-full border border-[#E8E2D9] px-3 py-1.5 text-xs font-medium text-[#666] transition hover:border-[#999]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(c._id)}
                    title="Delete"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] transition hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultationTable;