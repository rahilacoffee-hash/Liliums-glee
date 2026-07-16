import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

function Settings() {
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    siteName: "",
    consultationFee: 50000,
    supportEmail: "",
    supportPhone: "",
    instagram: "",
    facebook: "",
    twitter: "",
    whatsapp: "",
    address: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data } = await axiosInstance.get("/settings");

      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  }

  async function saveSettings() {
    try {
      setLoading(true);

      const { data } = await axiosInstance.put(
        "/settings",
        settings
      );

      if (data.success) {
        toast.success("Settings updated.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to save settings"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-8">

      <h1 className="mb-10 font-serif text-4xl">
        Website Settings
      </h1>

      <div className="space-y-10">

        {/* General */}

        <section className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-semibold">
            General
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block">
                Website Name
              </label>

              <input
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Consultation Fee (₦)
              </label>

              <input
                type="number"
                name="consultationFee"
                value={settings.consultationFee}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />
            </div>

          </div>

        </section>

        {/* Contact */}

        <section className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-semibold">
            Contact
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              name="supportEmail"
              placeholder="Support Email"
              value={settings.supportEmail}
              onChange={handleChange}
              className="rounded-xl border p-4"
            />

            <input
              name="supportPhone"
              placeholder="Phone"
              value={settings.supportPhone}
              onChange={handleChange}
              className="rounded-xl border p-4"
            />

            <textarea
              rows={3}
              name="address"
              placeholder="Office Address"
              value={settings.address}
              onChange={handleChange}
              className="rounded-xl border p-4 md:col-span-2"
            />

          </div>

        </section>

        {/* Socials */}

        <section className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-semibold">
            Social Media
          </h2>

          <div className="space-y-5">

            <input
              name="instagram"
              placeholder="Instagram URL"
              value={settings.instagram}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />

            <input
              name="facebook"
              placeholder="Facebook URL"
              value={settings.facebook}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />

            <input
              name="twitter"
              placeholder="Twitter URL"
              value={settings.twitter}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />

            <input
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={settings.whatsapp}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />

          </div>

        </section>

        <button
          onClick={saveSettings}
          disabled={loading}
          className="rounded-full bg-[#C8A96A] px-10 py-4 font-semibold"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>

      </div>

    </div>
  );
}

export default Settings;