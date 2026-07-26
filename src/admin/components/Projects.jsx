import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Upload, MapPin, Calendar } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let defaultProcess = [
  { title: "Understand", description: "" },
  { title: "Refine", description: "" },
  { title: "Deliver", description: "" },
];

let emptyForm = { title: "", slug: "", category: "", location: "", year: "", description: "", storyTitle: "", designApproach: "", highlights: [], process: defaultProcess, isFeatured: true };

function Projects() {
  let [projects, setProjects] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  let [editingId, setEditingId] = useState(null);
  let [form, setForm] = useState(emptyForm);
  let [imageFile, setImageFile] = useState(null);
  let [imagePreview, setImagePreview] = useState("");
  let [saving, setSaving] = useState(false);
  let [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      let { data } = await axiosInstance.get("/project");
      setProjects(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setEditingId("new");
  }

  function openEdit(p) {
    setForm({
      title: p.title,
      slug: p.slug || "",
      category: p.category,
      location: p.location,
      year: p.year,
      description: p.description || "",
      storyTitle: p.storyTitle || "",
      designApproach: p.designApproach || "",
      highlights: p.highlights || [],
      process: p.process?.length ? p.process : defaultProcess,
      isFeatured: p.isFeatured,
    });
    setImageFile(null);
    setImagePreview(p.image);
    setEditingId(p._id);
  }

  function closeForm() {
    setEditingId(null);
  }

  function handleImageSelect(file) {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!form.title.trim() || !form.category.trim()) {
      setError("Title and category are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      let formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "highlights" || key === "process") return;
        formData.append(key, value);
      });
      formData.append("highlights", JSON.stringify(form.highlights));
      formData.append("process", JSON.stringify(form.process));
      if (imageFile) formData.append("image", imageFile);

      if (editingId === "new") {
        await axiosInstance.post("/project", formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axiosInstance.put(`/project/${editingId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      }

      await fetchProjects();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axiosInstance.delete(`/project/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete project");
    } finally {
      setConfirmDeleteId(null);
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">Projects</h1>
          <p className="mt-1 text-sm text-[#777]">{projects.length} project{projects.length === 1 ? "" : "s"}</p>
        </div>

        <button onClick={openNew} className="flex items-center gap-2 rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-medium text-black transition hover:-translate-y-0.5">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {error && !editingId && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">No projects yet. Add your first one.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p._id} className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
              {p.image && <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />}
              <div className="p-5">
                <p className="mb-1 text-xs uppercase tracking-[2px] text-[#C8A96A]">{p.category}</p>
                <h3 className="mb-2 font-serif text-lg text-[#111111]">{p.title}</h3>
                <p className="mb-3 truncate text-xs text-[#999]">/gallery/{p.slug || "generated-from-title"}</p>

                <div className="mb-4 flex items-center gap-4 text-xs text-[#999]">
                  {p.location && <span className="flex items-center gap-1"><MapPin size={12} /> {p.location}</span>}
                  {p.year && <span className="flex items-center gap-1"><Calendar size={12} /> {p.year}</span>}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${p.isFeatured ? "bg-green-100 text-green-700" : "bg-[#F0EDE6] text-[#777]"}`}>
                    {p.isFeatured ? "On Homepage" : "Hidden"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] hover:border-[#C8A96A] hover:text-[#C8A96A]">
                      <Pencil size={14} />
                    </button>

                    {confirmDeleteId === p._id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(p._id)} className="rounded-full bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white">Confirm</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="rounded-full border px-2.5 py-1.5 text-xs">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteId(p._id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] hover:border-red-400 hover:text-red-500">
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
              <h3 className="font-serif text-xl text-[#111111]">{editingId === "new" ? "Add Project" : "Edit Project"}</h3>
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

              <Input label="Title" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} />
              <div>
                <Input label="URL Slug (optional)" value={form.slug} onChange={(v) => setForm((p) => ({ ...p, slug: v }))} />
                <p className="mt-1 text-xs text-[#999]">Leave empty to generate it from the title. Example: luxury-living-room.</p>
              </div>
              <Input label="Category" value={form.category} onChange={(v) => setForm((p) => ({ ...p, category: v }))} />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Location" value={form.location} onChange={(v) => setForm((p) => ({ ...p, location: v }))} />
                <Input label="Year" value={form.year} onChange={(v) => setForm((p) => ({ ...p, year: v }))} />
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-[#111111]">Project overview</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]"
                />
              </label>

              <Input label="Project story heading (optional)" value={form.storyTitle} onChange={(v) => setForm((p) => ({ ...p, storyTitle: v }))} />

              <label className="block">
                <span className="mb-2 block text-sm text-[#111111]">Design approach</span>
                <textarea value={form.designApproach} onChange={(e) => setForm((p) => ({ ...p, designApproach: e.target.value }))} rows={3} className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]" />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#111111]">Design highlights</span>
                <textarea value={form.highlights.join("\n")} onChange={(e) => setForm((p) => ({ ...p, highlights: e.target.value.split("\n").map((item) => item.trim()).filter(Boolean) }))} rows={4} placeholder="One highlight per line" className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]" />
                <p className="mt-1 text-xs text-[#999]">Add one outcome or design detail on each line.</p>
              </label>

              <div>
                <span className="mb-2 block text-sm text-[#111111]">Project process</span>
                <div className="space-y-3">
                  {form.process.map((step, index) => (
                    <div key={index} className="rounded-xl border border-[#E8E2D9] p-3">
                      <input value={step.title} onChange={(e) => setForm((p) => ({ ...p, process: p.process.map((item, itemIndex) => itemIndex === index ? { ...item, title: e.target.value } : item) }))} placeholder="Step title" className="w-full border-b border-[#E8E2D9] pb-2 text-sm font-medium outline-none focus:border-[#C8A96A]" />
                      <textarea value={step.description} onChange={(e) => setForm((p) => ({ ...p, process: p.process.map((item, itemIndex) => itemIndex === index ? { ...item, description: e.target.value } : item) }))} placeholder="Step description" rows={2} className="mt-2 w-full resize-none text-sm outline-none" />
                    </div>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#111111]">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))} />
                Show on homepage slider
              </label>
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

export default Projects;
