import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  contactInfo,
  socialLinks,
} from "./footerData";

import {
  fadeRight,
  staggerList,
  listItem,
  socialHover,
} from "./footerVariants";

function FooterContact() {
  return (
    <motion.div
      variants={fadeRight}
      className="space-y-14"
    >
      {/* Contact */}

      <div>
        <h3 className="mb-8 text-sm font-semibold uppercase tracking-[3px] text-[#C8A96A]">
          Contact
        </h3>

        <motion.ul
          variants={staggerList}
          className="space-y-6"
        >
          {contactInfo.map((item) => (
            <motion.li
              key={item.title}
              variants={listItem}
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-[2px] text-white/40">
                {item.title}
              </p>

              <a
                href={item.href}
                className="group inline-flex items-center gap-3 text-[15px] text-white/75 transition-colors duration-300 hover:text-[#C8A96A]"
              >
                {item.value}

                {item.href !== "#" && (
                  <ArrowUpRight
                    size={15}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                  />
                )}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Social */}

      <div>
        <h3 className="mb-8 text-sm font-semibold uppercase tracking-[3px] text-[#C8A96A]">
          Follow Us
        </h3>

        <div className="flex flex-wrap gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialHover}
                initial="rest"
                whileHover="hover"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#111111]"
                aria-label={social.name}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default FooterContact;