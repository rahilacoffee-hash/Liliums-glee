import { Heart } from "lucide-react";

function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-4 mb-4 rounded-[24px] border border-[#E8E2D9] bg-white/80 px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#999] md:flex-row">

        {/* Left */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <span className="font-serif text-[#111111]">Liliums Glee</span>
          <span>© {year} All Rights Reserved.</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <Heart size={15} className="fill-[#C8A96A] text-[#C8A96A]" />
          <span>by Bytecode</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#E8E2D9] bg-[#F8F5F0] px-3 py-1 text-xs font-medium text-[#111111]">
            Version 1.1.0
          </span>
          <span className="text-xs uppercase tracking-[1px] text-[#C8A96A]">
            Admin Panel
          </span>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;