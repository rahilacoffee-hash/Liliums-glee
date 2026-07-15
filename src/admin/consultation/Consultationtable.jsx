import { useState } from "react";
import { Trash2, Reply, X, Send } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let statusStyles = {
  Pending: "bg-[#F0EDE6] text-[#666]",
  Contacted: "bg-[#C8A96A]/20 text-[#8a6d3b]",
  Completed: "bg-green-100 text-green-700",
};

function ConsultationTable({ consultations, onDeleted, onReplied }) {
  let [confirmDeleteId, setConfirmDeleteId] = useState(null);
  let [replyingTo, setReplyingTo] = useState(null); // holds the consultation object
  let [replyText, setReplyText] = useState("");
  let [busyId, setBusyId] = useState(null);

  async function handleDelete(id) {
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

  async function handleSendReply() {
    if (!replyText.trim()) return;

    setBusyId(replyingTo._id);
    try {
      let { data } = await axiosInstance.post(`/consultation/${replyingTo._id}/reply`, {
        reply: replyText,
      });
      onReplied(replyingTo._id, data.data);
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reply");
    } finally {
      setBusyId(null);
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
    <>
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
              <tr key={c._id} className="border-b border-[#E8E2D9] align-top transition last:border-0 hover:bg-[#F8F5F0]">
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
                  {c.reply && (
                    <p className="mt-1 text-xs text-green-600">✓ Replied</p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[c.status] || statusStyles.Pending}`}>
                    {c.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-[#666]">
                  {new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                </td>

                <td className="px-5 py-4">
                  {confirmDeleteId === c._id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(c._id)}
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setReplyingTo(c);
                          setReplyText(c.reply || "");
                        }}
                        title="Reply"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
                      >
                        <Reply size={15} />
                      </button>

                      <button
                        onClick={() => setConfirmDeleteId(c._id)}
                        title="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] transition hover:border-red-400 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply modal */}
      {replyingTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#111111]">
                Reply to {replyingTo.fullName}
              </h3>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-[#999] hover:text-[#111111]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 rounded-xl bg-[#F8F5F0] p-4 text-sm text-[#666]">
              <p className="mb-1 font-medium text-[#111111]">Their message:</p>
              <p>{replyingTo.message}</p>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
              placeholder="Write your reply..."
              className="w-full rounded-xl border border-[#E8E2D9] px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#C8A96A]"
            />

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setReplyingTo(null)}
                className="rounded-full border border-[#E8E2D9] px-5 py-2.5 text-sm font-medium text-[#666] transition hover:border-[#999]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                disabled={busyId === replyingTo._id || !replyText.trim()}
                className="flex items-center gap-2 rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                <Send size={14} />
                {busyId === replyingTo._id ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConsultationTable;