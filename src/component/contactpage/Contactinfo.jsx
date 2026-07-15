import { motion } from "framer-motion";
import { FaFacebook, FaPinterestP } from "react-icons/fa6";

import contactData from "./contactData";
import { fadeLeft, staggerContainer } from "./contactVariants";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

let socialIcons = { FaFacebook, CiInstagram, FaPinterestP: FaPinterestP, LinkedIn: CiLinkedin };

function ContactInfo() {
  let { info } = contactData;

  let items = [
    { icon: MapPin, ...info.address },
    { icon: Phone, ...info.phone },
    { icon: Mail, ...info.email },
    { icon: Clock, ...info.hours },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.div variants={fadeLeft} className="mb-10">
        <h2 className="mb-2 font-serif text-3xl text-[#111111] md:text-4xl">Get In Touch</h2>
        <div className="h-px w-14 bg-[#C8A96A]" />
      </motion.div>

      <div className="space-y-8">
        {items.map((item) => {
          let Icon = item.icon;
          let values = Array.isArray(item.value) ? item.value : [item.value];

          return (
            <motion.div key={item.title} variants={fadeLeft} className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="mb-1 font-medium text-[#111111]">{item.title}</h3>
                {values.map((v) => (
                  <p key={v} className="text-sm leading-6 text-[#666]">{v}</p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={fadeLeft} className="mt-10">
        <p className="mb-4 text-sm font-medium text-[#111111]">Follow Us</p>
        <div className="flex gap-3">
          {info.socials.map((social) => {
            let Icon = socialIcons[social.name] ?? FaFacebook;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E2D9] text-[#111111] transition hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-black"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ContactInfo;