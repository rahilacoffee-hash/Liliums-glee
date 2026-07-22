import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail, MapPin,  } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import axiosInstance from "../../../api/axiosInstance";

import { fadeRight, staggerList, listItem, socialHover } from "./footerVariants";

function FooterContact() {
  let [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        let { data } = await axiosInstance.get("/settings");
        if (data.success) setSettings(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSettings();
  }, []);

  if (!settings) return null;

  let contactInfo = [
    { title: "Phone", value: settings.supportPhone, href: settings.supportPhone ? `tel:${settings.supportPhone}` : "#", icon: Phone },
    { title: "Email", value: settings.supportEmail, href: settings.supportEmail ? `mailto:${settings.supportEmail}` : "#", icon: Mail },
    { title: "Address", value: settings.address, href: "#", icon: MapPin },
  ].filter((item) => item.value); // don't show a row for fields that were never filled in

  let socialLinks = [
    { name: "Instagram", href: settings.instagram, icon: FaInstagram },
    { name: "Facebook", href: settings.facebook, icon: FaFacebook },
    { name: "Twitter", href: settings.twitter, icon: FaTwitter },
    { name: "WhatsApp", href: settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}` : "", icon: FaWhatsapp },
  ].filter((social) => social.href); // only show platforms that are actually configured

  return (
    <motion.div variants={fadeRight} className="space-y-14">
      {/* Contact */}
      {contactInfo.length > 0 && (
        <div>
          <h3 className="mb-8 text-sm font-semibold uppercase tracking-[3px] text-[#C8A96A]">Contact</h3>

          <motion.ul variants={staggerList} className="space-y-6">
            {contactInfo.map((item) => (
              <motion.li key={item.title} variants={listItem}>
                <p className="mb-2 text-xs font-medium uppercase tracking-[2px] text-white/40">{item.title}</p>

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
      )}

      {/* Social */}
      {socialLinks.length > 0 && (
        <div>
          <h3 className="mb-8 text-sm font-semibold uppercase tracking-[3px] text-[#C8A96A]">Follow Us</h3>

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
      )}
    </motion.div>
  );
}

export default FooterContact;