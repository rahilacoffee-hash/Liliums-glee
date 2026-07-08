import { Plus } from "lucide-react";

function Hotspot({ x, y, isActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D6A354] text-black shadow-lg"
      aria-label="View product"
      aria-expanded={isActive}
    >
      <span className="absolute inset-0 rounded-full bg-[#D6A354] animate-ping opacity-40" />
      <Plus size={16} className="relative" />
    </button>
  );
}

export default Hotspot;