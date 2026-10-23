
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mouse } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function HeroContent({ hero, reduceMotion }) {
  const primaryHref = hero.primaryButton?.href && hero.primaryButton.href !== "#"
    ? hero.primaryButton.href
    : "/gallery";
  const secondaryHref = hero.secondaryButton?.href && hero.secondaryButton.href !== "#"
    ? hero.secondaryButton.href
    : "/contact";
  const fade = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-7 pt-9 text-[#fff8ed] sm:px-10 sm:pt-10 lg:px-12 lg:pt-8 xl:px-16">

      {/* Brand typography */}
      <div className="absolute left-0 right-0 top-[18%] sm:top-[20%] lg:top-[19%]">
        <motion.h1
          {...fade}
          transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.1 }}
          className="whitespace-nowrap px-3 text-center font-display text-[20.5vw] uppercase leading-[0.8] tracking-[-0.075em] sm:px-8 sm:text-[18vw] lg:px-[7vw] lg:text-left lg:text-[clamp(9rem,17vw,21rem)]"
        >
          {hero.title || "LILIUMS"}
        </motion.h1>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.22 }}
          className="mr-[5%] mt-5 text-right font-script text-[22vw] leading-[0.65] text-[#e6bc83] drop-shadow-[0_6px_12px_rgba(0,0,0,.35)] sm:mr-[8%] sm:text-[16vw] lg:mr-[18vw] lg:mt-5 lg:text-[clamp(7rem,12vw,15rem)]"
        >
          {hero.scriptTitle || "Gleee"}
        </motion.p>
      </div>

      {/* Eyebrow and brand description */}
      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.3 }}
        className="absolute left-6 top-[12%] flex items-center gap-3 sm:left-10 lg:left-16 lg:top-[13%]"
      >
        <span className="h-px w-9 bg-[#e6bc83] lg:w-12" />
        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#f5d9b2] sm:text-[10px]">
          {hero.eyebrow || "INTERIOR DESIGN"}
        </p>
      </motion.div>

      {/* Main description and calls to action */}
      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.4 }}
        className="absolute left-6 top-[53%] max-w-[360px] sm:left-10 sm:top-[54%] lg:left-[9%] lg:top-[55%] lg:max-w-[440px]"
      >
        <p className="max-w-md text-sm leading-6 text-white/85 sm:text-base sm:leading-7 lg:text-lg">
          {hero.description ||
            "Thoughtfully designed interiors. Timeless materials. A new standard of modern luxury."}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to={primaryHref}
            className="group inline-flex min-h-11 items-center gap-3 bg-[#e6bc83] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#21160f] transition-colors hover:bg-[#fff0d9] sm:px-5 sm:text-[10px]"
          >
            {hero.primaryButton?.label || hero.primaryButton?.text || "Explore Our Work"}
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            to={secondaryHref}
            className="group inline-flex min-h-11 items-center gap-3 border border-white/50 px-4 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:border-[#e6bc83] hover:text-[#e6bc83] sm:px-5 sm:text-[10px]"
          >
            {hero.secondaryButton?.label || hero.secondaryButton?.text || "Start a Project"}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </motion.div>

      {/* Social links */}
      <div className="absolute bottom-[7%] left-6 hidden items-center gap-5 sm:left-10 lg:flex xl:left-16">
        <a href="https://instagram.com/" aria-label="Instagram" className="transition hover:text-[#e6bc83]">
          <FaInstagram size={17} />
        </a>
        <a href="https://tiktok.com/" aria-label="TikTok" className="transition hover:text-[#e6bc83]">
          <FaTiktok size={16} />
        </a>
       
      </div>

      {/* Scroll indicator */}
     
    </div>
  );
}

export default HeroContent;
