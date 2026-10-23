import { AnimatePresence, motion } from "framer-motion";

function HeroBackground({ slide, offset, reduceMotion }) {
  return <div className="absolute inset-0 overflow-hidden"><AnimatePresence><motion.img key={slide.id} src={slide.image} alt={slide.alt} initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.06, x: offset.x, y: offset.y }} exit={{ opacity: 0 }} transition={{ opacity: { duration: reduceMotion ? 0 : 1.1 }, scale: { duration: reduceMotion ? 0 : 20, ease: "linear" }, x: { duration: 0.5 }, y: { duration: 0.5 } }} className="absolute inset-0 h-full w-full object-cover object-center" /></AnimatePresence><div className="absolute inset-0 bg-[#100B07]/40" /><div className="absolute inset-0 bg-gradient-to-r from-[#160D08]/80 via-[#160D08]/34 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-[#100B07]/80 via-[#100B07]/10 to-[#100B07]/20" /></div>;
}
export default HeroBackground;
