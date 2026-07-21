import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let emptyForm = { number: "", title: "", description: "", features: [""] };

function Servicess() {
  let [services, setServices] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  let [editingId, setEditingId] = useState(null);
  let [form, setForm] = useState(emptyForm);
  let [imageFile, setImageFile] = useState(null);
  let [imagePreview, setImagePreview] = useState("");
  let [saving, setSaving] = useState(false);
  let [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      let { data } = await axiosInstance.get("/service");
      setServices(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setForm({ ...emptyForm, number: String(services.length + 1).padStart(2, "0") });
    setImageFile(null);
    setImagePreview("");
    setEditingId("new");
  }

  function openEdit(s) {
    setForm({ number: s.number, title: s.title, description: s.description, features: s.features.length ? s.features : [""] });
    setImageFile(null);
    setImagePreview(s.image);
    setEditingId(s._id);
  }

  function closeForm() {
    setEditingId(null);
  }

  function handleImageSelect(file) {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function updateFeature(index, value) {
    setForm((prev) => {
      let features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  }

  function addFeature() {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  }

  function removeFeature(index) {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  }

  async function handleSave() {
    if (!form.number.trim() || !form.title.trim() || !form.description.trim()) {
      setError("Number, title, and description are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      let formData = new FormData();
      formData.append("number", form.number);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("features", JSON.stringify(form.features.filter((f) => f.trim())));
      if (imageFile) formData.append("image", imageFile);

      if (editingId === "new") {
        await axiosInstance.post("/service", formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axiosInstance.put(`/service/${editingId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      }

      await fetchServices();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axiosInstance.delete(`/service/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete service");
    } finally {
      setConfirmDeleteId(null);
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">Services</h1>
          <p className="mt-1 text-sm text-[#777]">{services.length} service{services.length === 1 ? "" : "s"}</p>
        </div>

        <button onClick={openNew} className="flex items-center gap-2 rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black transition hover:-translate-y-0.5">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {error && !editingId && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">Loading...</div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">No services yet. Add your first one.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s._id} className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
              {s.image && <img src={s.image} alt={s.title} className="h-40 w-full object-cover" />}
              <div className="p-5">
                <p className="mb-1 text-xs uppercase tracking-[2px] text-[#C8A96A]">{s.number}</p>
                <h3 className="mb-2 font-serif text-lg text-[#111111]">{s.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-[#666]">{s.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#999]">{s.features.length} feature{s.features.length === 1 ? "" : "s"}</span>

                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(s)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] hover:border-[#C8A96A] hover:text-[#C8A96A]">
                      <Pencil size={14} />
                    </button>

                    {confirmDeleteId === s._id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(s._id)} className="rounded-full bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white">Confirm</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="rounded-full border px-2.5 py-1.5 text-xs">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteId(s._id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] hover:border-red-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#111111]">{editingId === "new" ? "Add Service" : "Edit Service"}</h3>
              <button onClick={closeForm} className="text-[#999] hover:text-[#111111]"><X size={20} /></button>
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {imagePreview && <img src={imagePreview} alt="" className="h-16 w-24 rounded-xl object-cover" />}
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#C8A96A] px-4 py-2.5 text-sm text-[#C8A96A]">
                  <Upload size={14} /> {imagePreview ? "Replace Image" : "Upload Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e.target.files[0])} />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input label="Number" value={form.number} onChange={(v) => setForm((p) => ({ ...p, number: v }))} />
                </div>
                <div className="col-span-2">
                  <Input label="Title" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} />
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-[#111111]">Description</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]"
                />
              </label>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#111111]">Features</span>
                  <button onClick={addFeature} className="text-xs font-medium text-[#C8A96A]">+ Add</button>
                </div>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={f}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        className="flex-1 rounded-xl border border-[#E8E2D9] p-2.5 text-sm outline-none focus:border-[#C8A96A]"
                      />
                      <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeForm} className="rounded-full border border-[#E8E2D9] px-5 py-2.5 text-sm font-medium text-[#666]">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black disabled:opacity-60">
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
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]" />
    </label>
  );
}

export default Servicess;