import { useState, useEffect } from "react";
import { Plus, Star, Pencil, Trash2, X, Upload } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let emptyForm = { name: "", role: "", quote: "", project: "", rating: 5, isFeatured: true };

function Testimonials() {
  let [testimonials, setTestimonials] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  let [editingId, setEditingId] = useState(null); // null = closed, "new" = creating, or an _id = editing
  let [form, setForm] = useState(emptyForm);
  let [avatarFile, setAvatarFile] = useState(null);
  let [avatarPreview, setAvatarPreview] = useState("");
  let [saving, setSaving] = useState(false);

  let [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      let { data } = await axiosInstance.get("/testimonial");
      setTestimonials(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setForm(emptyForm);
    setAvatarFile(null);
    setAvatarPreview("");
    setEditingId("new");
  }

  function openEdit(t) {
    setForm({ name: t.name, role: t.role, quote: t.quote, project: t.project, rating: t.rating, isFeatured: t.isFeatured });
    setAvatarFile(null);
    setAvatarPreview(t.avatar);
    setEditingId(t._id);
  }

  function closeForm() {
    setEditingId(null);
  }

  function handleAvatarSelect(file) {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!form.name.trim() || !form.quote.trim()) {
      setError("Name and quote are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      let formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (avatarFile) formData.append("avatar", avatarFile);

      if (editingId === "new") {
        await axiosInstance.post("/testimonial", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.put(`/testimonial/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchTestimonials();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axiosInstance.delete(`/testimonial/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete testimonial");
    } finally {
      setConfirmDeleteId(null);
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">Testimonials</h1>
          <p className="mt-1 text-sm text-[#777]">{testimonials.length} testimonial{testimonials.length === 1 ? "" : "s"}</p>
        </div>

        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black transition hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {error && !editingId && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
          No testimonials yet. Add your first one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t._id} className="rounded-2xl border border-[#E8E2D9] bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <img src={t.avatar || "/default-avatar.png"} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-[#111111]">{t.name}</p>
                  <p className="text-xs text-[#999]">{t.role}</p>
                </div>
              </div>

              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < t.rating ? "fill-[#C8A96A] text-[#C8A96A]" : "text-[#E8E2D9]"} />
                ))}
              </div>

              <p className="mb-4 line-clamp-3 text-sm text-[#666]">{t.quote}</p>

              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${t.isFeatured ? "bg-green-100 text-green-700" : "bg-[#F0EDE6] text-[#777]"}`}>
                  {t.isFeatured ? "Visible" : "Hidden"}
                </span>

                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(t)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] hover:border-[#C8A96A] hover:text-[#C8A96A]">
                    <Pencil size={14} />
                  </button>

                  {confirmDeleteId === t._id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(t._id)} className="rounded-full bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white">
                        Confirm
                      </button>
                      <button onClick={() => setConfirmDeleteId(null)} className="rounded-full border px-2.5 py-1.5 text-xs">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDeleteId(t._id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] hover:border-red-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#111111]">
                {editingId === "new" ? "Add Testimonial" : "Edit Testimonial"}
              </h3>
              <button onClick={closeForm} className="text-[#999] hover:text-[#111111]">
                <X size={20} />
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {avatarPreview && <img src={avatarPreview} alt="" className="h-16 w-16 rounded-full object-cover" />}
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#C8A96A] px-4 py-2.5 text-sm text-[#C8A96A]">
                  <Upload size={14} />
                  {avatarPreview ? "Replace Photo" : "Upload Photo"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarSelect(e.target.files[0])} />
                </label>
              </div>

              <Input label="Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
              <Input label="Role / Company" value={form.role} onChange={(v) => setForm((p) => ({ ...p, role: v }))} />
              <Input label="Project Tag (optional)" value={form.project} onChange={(v) => setForm((p) => ({ ...p, project: v }))} />

              <label className="block">
                <span className="mb-2 block text-sm text-[#111111]">Quote</span>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]"
                />
              </label>

              <div className="flex items-center justify-between">
                <label className="text-sm text-[#111111]">Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
                  className="rounded-xl border border-[#E8E2D9] p-2 text-sm"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Star{r === 1 ? "" : "s"}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#111111]">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
                />
                Visible on homepage
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeForm} className="rounded-full border border-[#E8E2D9] px-5 py-2.5 text-sm font-medium text-[#666]">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#111111]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]"
      />
    </label>
  );
}

export default Testimonials;