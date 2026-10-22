import { useEffect, useRef, useState } from "react";
import { Camera, Mail, Phone, Save, UserRound } from "lucide-react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../component/layout/Navbar/Navbar";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, loading, setUser } = useAuth();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "", mobile: user.mobile || "" });
      setAvatarPreview(user.avatar || "");
    }
  }, [user]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] text-sm text-[#777]">Loading profile...</div>;
  if (!user) return <Navigate to="/login" replace />;

  function selectAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Avatar image must be 5 MB or smaller.");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("mobile", form.mobile.trim());
      if (avatarFile) formData.append("avatar", avatarFile);

      const { data } = await axiosInstance.put("/user/update-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!data.success) throw new Error(data.message);
      setUser(data.data);
      setAvatarFile(null);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <><Navbar /><main className="min-h-screen bg-[#F8F5F0] px-6 pb-20 pt-36"><div className="mx-auto max-w-3xl">
      <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[3px] text-[#C8A96A]">Account</p><h1 className="mt-2 font-serif text-4xl text-[#111111]">My Profile</h1><p className="mt-3 text-[#666]">Update your personal details and profile photo.</p></div>
      <form onSubmit={saveProfile} className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-10 flex flex-col items-center gap-5 sm:flex-row">
          <div className="relative"><div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#F0E7D8] text-[#9A7948] ring-4 ring-[#C8A96A]/20">{avatarPreview ? <img src={avatarPreview} alt="Profile avatar" className="h-full w-full object-cover" /> : <UserRound size={44} />}</div><button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white transition hover:bg-[#C8A96A] hover:text-black" aria-label="Choose avatar"><Camera size={17} /></button><input ref={fileInputRef} onChange={selectAvatar} accept="image/jpeg,image/png,image/webp" type="file" className="hidden" /></div>
          <div className="text-center sm:text-left"><h2 className="font-serif text-2xl text-[#111111]">Profile photo</h2><p className="mt-1 text-sm leading-6 text-[#777]">JPG, PNG, or WebP. Maximum size: 5 MB.</p><button type="button" onClick={() => fileInputRef.current?.click()} className="mt-3 text-sm font-semibold text-[#A98446] hover:text-[#111111]">Upload a new photo</button></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" icon={UserRound}><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-profile" /></Field>
          <Field label="Phone number" icon={Phone}><input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="input-profile" placeholder="080..." /></Field>
          <div className="sm:col-span-2"><Field label="Email address" icon={Mail}><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-profile" /></Field></div>
        </div>
        <button disabled={saving} className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#C8A96A] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"><Save size={17} />{saving ? "Saving..." : "Save Changes"}</button>
      </form>
    </div></main></>
  );
}

function Field({ label, icon: Icon, children }) { return <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#333]"><Icon size={15} className="text-[#C8A96A]" />{label}</span>{children}</label>; }

export default Profile;
