import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

let iconOptions = ["Armchair", "Columns3", "Building2", "ShoppingBag"];

function SiteContentEditor() {
  let [loading, setLoading] = useState(true);
  let [saving, setSaving] = useState(false);
  let [message, setMessage] = useState("");
  let [error, setError] = useState("");

  let [hero, setHero] = useState(null);
  let [about, setAbout] = useState(null);
  let [stats, setStats] = useState([]);

  // Files staged for upload - only sent if the admin actually picks a new one
  let [heroBackgroundFile, setHeroBackgroundFile] = useState(null);
  let [heroFeaturedFile, setHeroFeaturedFile] = useState(null);
  let [aboutFile, setAboutFile] = useState(null);

  let [heroBackgroundPreview, setHeroBackgroundPreview] = useState("");
  let [heroFeaturedPreview, setHeroFeaturedPreview] = useState("");
  let [aboutPreview, setAboutPreview] = useState("");

  useEffect(() => {
    async function fetchContent() {
      try {
        let { data } = await axiosInstance.get("/site-content");
        setHero(data.data.hero);
        setAbout(data.data.about);
        setStats(data.data.stats);
        setHeroBackgroundPreview(data.data.hero.backgroundImage);
        setHeroFeaturedPreview(data.data.hero.featuredCollection.image);
        setAboutPreview(data.data.about.image);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load site content");
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  function handleFileSelect(file, setFile, setPreview) {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function updateHeroField(field, value) {
    setHero((prev) => ({ ...prev, [field]: value }));
  }

  function updateHeroNested(section, field, value) {
    setHero((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  }

  function updateShowcaseItem(index, field, value) {
    setHero((prev) => {
      let showcase = [...prev.showcase];
      showcase[index] = { ...showcase[index], [field]: value };
      return { ...prev, showcase };
    });
  }

  function addShowcaseItem() {
    setHero((prev) => ({
      ...prev,
      showcase: [
        ...prev.showcase,
        { id: Date.now(), icon: "Armchair", title: "", description: "", href: "/services" },
      ],
    }));
  }

  function removeShowcaseItem(index) {
    setHero((prev) => ({ ...prev, showcase: prev.showcase.filter((_, i) => i !== index) }));
  }

  function updateStat(index, field, value) {
    setStats((prev) => {
      let next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addStat() {
    setStats((prev) => [...prev, { label: "", value: "" }]);
  }

  function removeStat(index) {
    setStats((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      let formData = new FormData();
      formData.append("hero", JSON.stringify(hero));
      formData.append("about", JSON.stringify(about));
      formData.append("stats", JSON.stringify(stats));

      if (heroBackgroundFile) formData.append("heroBackgroundImage", heroBackgroundFile);
      if (heroFeaturedFile) formData.append("heroFeaturedImage", heroFeaturedFile);
      if (aboutFile) formData.append("aboutImage", aboutFile);

      let { data } = await axiosInstance.put("/site-content", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setHero(data.data.hero);
      setAbout(data.data.about);
      setStats(data.data.stats);
      setMessage("Site content updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save site content");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-sm text-[#777]">Loading site content...</div>;
  }

  if (!hero || !about) {
    return <div className="p-10 text-center text-sm text-red-500">{error || "Failed to load content"}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <h1 className="mb-2 font-serif text-3xl text-[#111111]">Homepage Content</h1>
      <p className="mb-10 text-sm text-[#777]">Edit your hero section, about section, and stats counters.</p>

      {message && <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}
      {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      <div className="space-y-10">

        {/* ============ HERO ============ */}
        <section className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-semibold text-[#111111]">Hero Section</h2>

          <div className="mb-6">
            <ImageUploadField
              label="Background Image"
              preview={heroBackgroundPreview}
              onSelect={(file) => handleFileSelect(file, setHeroBackgroundFile, setHeroBackgroundPreview)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Eyebrow" value={hero.eyebrow} onChange={(v) => updateHeroField("eyebrow", v)} />
            <TextField label="Title" value={hero.title} onChange={(v) => updateHeroField("title", v)} />
          </div>

          <div className="mt-6">
            <TextAreaField label="Description" value={hero.description} onChange={(v) => updateHeroField("description", v)} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E8E2D9] p-5">
              <p className="mb-3 text-sm font-medium text-[#111111]">Primary Button</p>
              <TextField label="Label" value={hero.primaryButton.label} onChange={(v) => updateHeroNested("primaryButton", "label", v)} />
              <div className="mt-3">
                <TextField label="Link" value={hero.primaryButton.href} onChange={(v) => updateHeroNested("primaryButton", "href", v)} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#E8E2D9] p-5">
              <p className="mb-3 text-sm font-medium text-[#111111]">Secondary Button</p>
              <TextField label="Label" value={hero.secondaryButton.label} onChange={(v) => updateHeroNested("secondaryButton", "label", v)} />
              <div className="mt-3">
                <TextField label="Link" value={hero.secondaryButton.href} onChange={(v) => updateHeroNested("secondaryButton", "href", v)} />
              </div>
            </div>
          </div>
        </section>

        {/* ============ FEATURED COLLECTION CARD ============ */}
        <section className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-semibold text-[#111111]">Hero Featured Card</h2>

          <div className="mb-6">
            <ImageUploadField
              label="Card Image"
              preview={heroFeaturedPreview}
              onSelect={(file) => handleFileSelect(file, setHeroFeaturedFile, setHeroFeaturedPreview)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Badge" value={hero.featuredCollection.badge} onChange={(v) => updateHeroNested("featuredCollection", "badge", v)} />
            <TextField label="Eyebrow" value={hero.featuredCollection.eyebrow} onChange={(v) => updateHeroNested("featuredCollection", "eyebrow", v)} />
          </div>

          <div className="mt-6">
            <TextField label="Title" value={hero.featuredCollection.title} onChange={(v) => updateHeroNested("featuredCollection", "title", v)} />
          </div>

          <div className="mt-6">
            <TextAreaField label="Description" value={hero.featuredCollection.description} onChange={(v) => updateHeroNested("featuredCollection", "description", v)} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TextField
              label="Button Label"
              value={hero.featuredCollection.button.label}
              onChange={(v) =>
                setHero((prev) => ({
                  ...prev,
                  featuredCollection: { ...prev.featuredCollection, button: { ...prev.featuredCollection.button, label: v } },
                }))
              }
            />
            <TextField
              label="Button Link"
              value={hero.featuredCollection.button.href}
              onChange={(v) =>
                setHero((prev) => ({
                  ...prev,
                  featuredCollection: { ...prev.featuredCollection, button: { ...prev.featuredCollection.button, href: v } },
                }))
              }
            />
          </div>
        </section>

        {/* ============ SHOWCASE BAR ============ */}
        <section className="rounded-3xl bg-white p-8 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#111111]">Hero Showcase Bar</h2>
            <button onClick={addShowcaseItem} className="flex items-center gap-1.5 rounded-full bg-[#C8A96A] px-4 py-2 text-sm font-medium text-black">
              <Plus size={14} /> Add Item
            </button>
          </div>

          <div className="space-y-4">
            {hero.showcase.map((item, i) => (
              <div key={item.id} className="rounded-2xl border border-[#E8E2D9] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[1px] text-[#999]">Item {i + 1}</span>
                  <button onClick={() => removeShowcaseItem(i)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField label="Title" value={item.title} onChange={(v) => updateShowcaseItem(i, "title", v)} />
                  <TextField label="Link" value={item.href} onChange={(v) => updateShowcaseItem(i, "href", v)} />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <TextField label="Description" value={item.description} onChange={(v) => updateShowcaseItem(i, "description", v)} />
                  <div>
                    <label className="mb-2 block text-sm text-[#111111]">Icon</label>
                    <select
                      value={item.icon}
                      onChange={(e) => updateShowcaseItem(i, "icon", e.target.value)}
                      className="w-full rounded-xl border p-3"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-semibold text-[#111111]">About Section</h2>

          <div className="mb-6">
            <ImageUploadField
              label="About Image"
              preview={aboutPreview}
              onSelect={(file) => handleFileSelect(file, setAboutFile, setAboutPreview)}
            />
          </div>

          <TextField label="Title" value={about.title} onChange={(v) => setAbout((prev) => ({ ...prev, title: v }))} />

          <div className="mt-6">
            <TextAreaField label="Description" value={about.description} onChange={(v) => setAbout((prev) => ({ ...prev, description: v }))} />
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="rounded-3xl bg-white p-8 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#111111]">Stats Counter</h2>
            <button onClick={addStat} className="flex items-center gap-1.5 rounded-full bg-[#C8A96A] px-4 py-2 text-sm font-medium text-black">
              <Plus size={14} /> Add Stat
            </button>
          </div>

          <div className="space-y-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-[#E8E2D9] p-4">
                <div className="flex-1">
                  <TextField label="Value (e.g. 250+)" value={stat.value} onChange={(v) => updateStat(i, "value", v)} />
                </div>
                <div className="flex-1">
                  <TextField label="Label" value={stat.label} onChange={(v) => updateStat(i, "label", v)} />
                </div>
                <button onClick={() => removeStat(i)} className="mt-6 text-red-500 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[#C8A96A] px-10 py-4 font-semibold text-black transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}

function TextField({ label, value, onChange }) {
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

function TextAreaField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#111111]">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-[#E8E2D9] p-3 text-sm outline-none focus:border-[#C8A96A]"
      />
    </label>
  );
}

function ImageUploadField({ label, preview, onSelect }) {
  let inputRef = useRef(null);

  return (
    <div>
      <span className="mb-2 block text-sm text-[#111111]">{label}</span>
      <div className="flex items-center gap-4">
        {preview && (
          <img src={preview} alt="" className="h-20 w-32 rounded-xl object-cover" />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-xl border border-dashed border-[#C8A96A] px-4 py-3 text-sm text-[#C8A96A] hover:bg-[#C8A96A]/5"
        >
          <Upload size={15} />
          {preview ? "Replace Image" : "Upload Image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onSelect(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default SiteContentEditor;