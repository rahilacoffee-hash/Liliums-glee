import { motion } from "framer-motion";

function AuthLayout({ title, subtitle, eyebrow, children, footer }) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex font-sans">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img
          src=
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600"
          alt="Luxury Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex flex-col justify-between p-16 text-white">
          <div>
            <h1 className="text-5xl font-serif font-medium tracking-[6px] text-[#C9A46B]">
              LILIUMS GLEE
            </h1>

            <p className="mt-5 text-lg text-[#E8DED4] max-w-md leading-8 font-light">
              Timeless fashion crafted for women who appreciate elegance,
              confidence, and luxury.
            </p>
          </div>

          <div>
            <p className="text-sm text-[#8C7F72] tracking-[2px] uppercase">
              Luxury isn't about attention.
            </p>

            <h2 className="text-3xl font-serif font-light italic mt-2 text-[#F3ECE9]">
              It's about presence.
            </h2>
          </div>
        </div>
      </div>

      {/* Woven label seam — signature element */}
      <div className="hidden lg:flex w-px relative bg-gradient-to-b from-transparent via-[#C9A46B]/40 to-transparent">
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] tracking-[4px] uppercase text-[#8C7F72] select-none"
          style={{ writingMode: "vertical-rl", transform: "translate(-50%, -50%) rotate(180deg)" }}
        >
          Liliums glee 
        </span>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-2xl font-serif font-medium tracking-[4px] text-[#C9A46B]">
              LILIUMS GLEE
            </h1>
            <div className="mt-4 h-px w-16 mx-auto bg-[#C9A46B]/40" />
          </div>

          {eyebrow && (
            <p className="text-xs tracking-[3px] uppercase text-[#C9A46B] mb-3">
              {eyebrow}
            </p>
          )}

          <h2 className="text-3xl font-serif font-medium text-[#F3ECE9]">
            {title}
          </h2>

          {subtitle && (
            <p className="text-[#8C7F72] mt-3 leading-relaxed">{subtitle}</p>
          )}

          <div className="mt-10">{children}</div>

          {footer && (
            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              {footer}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;