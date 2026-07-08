import { motion } from "framer-motion";

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img
          src="/images/auth-fashion.jpg"
          alt="Luxury Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex flex-col justify-between p-16 text-white">
          <div>
            <h1 className="text-5xl font-serif tracking-[6px] text-[#C9A46B]">
              LILIUM SGLEE
            </h1>

            <p className="mt-5 text-lg text-[#E8DED4] max-w-md leading-8">
              Timeless fashion crafted for women who appreciate elegance,
              confidence, and luxury.
            </p>
          </div>

          <div>
            <p className="text-sm text-[#D8C9BA]">
              Luxury isn't about attention.
            </p>

            <h2 className="text-3xl font-light mt-2">
              It's about presence.
            </h2>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
        >
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-serif tracking-[4px] text-[#C9A46B]">
              LILIUM SGLEE
            </h1>
          </div>

          <h2 className="text-3xl text-white font-semibold">{title}</h2>

          {subtitle && (
            <p className="text-[#B7ACA2] mt-2">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;