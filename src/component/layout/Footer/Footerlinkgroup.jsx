import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Self-contained: doesn't rely on inherited animation state from an
// ancestor whileInView trigger, which is what made the links invisible
// before (they were stuck at opacity:0 waiting on a parent that never
// propagated "visible" once nested inside the collapsible wrapper).
function FooterLinkGroup({ title, links }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 pb-6 lg:border-none lg:pb-0">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mb-6 flex w-full items-center justify-between text-sm font-semibold uppercase tracking-[3px] text-[#C8A96A] lg:mb-8 lg:pointer-events-none"
      >
        {title}

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:!grid-rows-[1fr] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-5 pb-1">
            {links.map((link) => (
              <li key={link.name}>
                <motion.div whileHover="hover" initial="rest" animate="rest">
                  <Link
                    to={link.href}
                    className="group flex items-center gap-3 text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    <motion.span
                      variants={{ rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight size={15} />
                    </motion.span>
                    <span className="text-[15px]">{link.name}</span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterLinkGroup;