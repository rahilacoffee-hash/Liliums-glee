import { Heart } from "lucide-react";

function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
        {/* Left */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <span>© {year} Liliums Glee.</span>

          <span>All Rights Reserved.</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1">
          <span>Built with</span>

          <Heart
            size={16}
            className="fill-red-500 text-red-500"
          />

          <span>by Bytecode</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-gray-700">
            Version 1.0.0
          </span>

          <span className="text-xs text-gray-400">
            Admin Panel
          </span>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;