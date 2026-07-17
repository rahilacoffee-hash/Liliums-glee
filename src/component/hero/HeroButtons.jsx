import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

// Reconstructed to accept props instead of importing static heroData -
// if your actual HeroButtons.jsx differs, keep your version but make
// sure it takes primaryButton/secondaryButton as props like this one.
function HeroButtons({ primaryButton, secondaryButton }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Link
        to={primaryButton?.href || "/shop"}
        className="group inline-flex items-center gap-2 rounded-full bg-[#C8A96A] px-7 py-4 text-sm font-semibold uppercase tracking-[1px] text-black transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        {primaryButton?.label || "Explore Projects"}
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </Link>

      <button className="flex items-center gap-3 text-sm font-medium text-white/85 transition hover:text-[#C8A96A]">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30">
          <Play size={14} className="ml-0.5" fill="currentColor" />
        </span>
        {secondaryButton?.label || "Watch Showreel"}
      </button>
    </div>
  );
}

export default HeroButtons;