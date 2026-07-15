import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Send, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

let statusOptions = ["Pending", "Contacted", "Completed"];

function ConsultationDetails() {
  let { id } = useParams();
  let navigate = useNavigate();

  let [consultation, setConsultation] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  let [replyText, setReplyText] = useState("");
  let [sendingReply, setSendingReply] = useState(false);
  let [replyMessage, setReplyMessage] = useState("");

  let [updatingStatus, setUpdatingStatus] = useState(false);
  let [confirmDelete, setConfirmDelete] = useState(false);
  let [deleting, setDeleting] = useState(false);

  async function fetchConsultation() {
    setLoading(true);
    setError("");
    try {
      let { data } = await axiosInstance.get(`/consultation/${id}`);
      setConsultation(data.data);
      setReplyText(data.data.reply || "");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load consultation");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  async function handleSendReply() {
    if (!replyText.trim()) return;

    setSendingReply(true);
    setReplyMessage("");
    try {
      let { data } = await axiosInstance.post(`/consultation/${id}/reply`, { reply: replyText });
      setConsultation(data.data);
      setReplyMessage("Reply sent successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  }

  async function handleStatusChange(newStatus) {
    setUpdatingStatus(true);
    try {
      let { data } = await axiosInstance.put(`/consultation/${id}/status`, { status: newStatus });
      setConsultation(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/consultation/${id}`);
      navigate("/admin/consultations");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete consultation");
      setDeleting(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-sm text-[#777]">Loading consultation...</div>;
  }

  if (error && !consultation) {
    return <div className="p-10 text-center text-sm text-red-500">{error}</div>;
  }

  if (!consultation) return null;

  return (
    <div className="p-6 md:p-10">
      <Link to="/admin/consultations" className="mb-6 inline-flex items-center gap-1 text-sm text-[#777] hover:text-[#C8A96A]">
        <ChevronLeft size={16} />
        Back to Consultations
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">{consultation.fullName}</h1>
          <p className="mt-1 text-sm text-[#777]">
            Submitted {new Date(consultation.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <select
          value={consultation.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={updatingStatus}
          className="rounded-full border border-[#E8E2D9] bg-white px-4 py-2 text-sm text-[#111111] outline-none focus:border-[#C8A96A] disabled:opacity-60"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left: request details + message + reply */}
        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6">
            <h2 className="mb-4 font-serif text-lg text-[#111111]">Project Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#999]">Project Type</p>
                <p className="text-[#111111]">{consultation.projectType}</p>
              </div>
              <div>
                <p className="text-[#999]">Service Needed</p>
                <p className="text-[#111111]">{consultation.service}</p>
              </div>
              <div>
                <p className="text-[#999]">Budget</p>
                <p className="text-[#111111]">{consultation.budget || "Not specified"}</p>
              </div>
              <div>
                <p className="text-[#999]">Preferred Date/Time</p>
                <p className="text-[#111111]">
                  {consultation.preferredDate || "—"} {consultation.preferredTime && `at ${consultation.preferredTime}`}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6">
            <h2 className="mb-3 font-serif text-lg text-[#111111]">Their Message</h2>
            <p className="text-sm leading-7 text-[#666]">{consultation.message}</p>
          </div>

          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6">
            <h2 className="mb-3 font-serif text-lg text-[#111111]">
              {consultation.reply ? "Your Reply" : "Send a Reply"}
            </h2>

            {consultation.repliedAt && (
              <p className="mb-3 text-xs text-[#999]">
                Last replied {new Date(consultation.repliedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
              placeholder="Write your reply..."
              className="w-full rounded-xl border border-[#E8E2D9] px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#C8A96A]"
            />

            {replyMessage && (
              <p className="mt-2 text-sm text-green-600">{replyMessage}</p>
            )}

            <button
              onClick={handleSendReply}
              disabled={sendingReply || !replyText.trim()}
              className="mt-4 flex items-center gap-2 rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Send size={14} />
              {sendingReply ? "Sending..." : consultation.reply ? "Send Updated Reply" : "Send Reply"}
            </button>
          </div>
        </div>

        {/* Right: contact info + delete */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6">
            <h2 className="mb-4 font-serif text-lg text-[#111111]">Contact</h2>
            <p className="text-sm text-[#111111]">{consultation.email}</p>
            <p className="mt-1 text-sm text-[#666]">{consultation.phone}</p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-6">
            <h2 className="mb-3 font-serif text-lg text-[#111111]">Danger Zone</h2>
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-full border border-[#E8E2D9] px-4 py-2.5 text-sm font-medium text-[#666] transition hover:border-[#999]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete Consultation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationDetails;