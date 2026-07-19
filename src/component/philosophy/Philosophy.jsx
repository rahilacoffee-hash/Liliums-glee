import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

import PhilosophyContent from "./PhilosophyContent";
import PhilosophyImage from "./PhilosophyImage";

function Philosophy() {
  let [about, setAbout] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        let { data } = await axiosInstance.get("/site-content");
        setAbout(data.data.about);
      } catch (err) {
        console.error("Failed to load about content:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  // Keep the section's height roughly stable while loading so the page
  // doesn't jump once the real content arrives
  if (loading || !about) {
    return <section className="bg-[#F7F4EF] py-32" />;
  }

  return (
    <section className="bg-[#F7F4EF] py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 lg:flex-row">
        <PhilosophyContent about={about} />
        <PhilosophyImage about={about} />
      </div>
    </section>
  );
}

export default Philosophy;