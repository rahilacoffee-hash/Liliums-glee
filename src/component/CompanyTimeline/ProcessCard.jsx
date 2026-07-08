import { motion } from "framer-motion";
import { MessageCircle, PenTool, Layers, Hammer, Sparkles } from "lucide-react";

const icons = { MessageCircle, PenTool, Layers, Hammer, Sparkles };

function ProcessCard({ item, index }) {
  let Icon = icons[item.icon] ?? MessageCircle;
  let isEven = index % 2 === 0;

  return (
    <div className="relative mb-16 last:mb-0 lg:mb-24">

      {/* Desktop: fixed-width center column keeps the node locked to the
          line regardless of card content, no order/hidden juggling */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_56px_1fr] lg:items-center lg:gap-10">
        <div>{isEven && <ProcessCardBody item={item} align="right" />}</div>

        <Node Icon={Icon} index={index} />

        <div>{!isEven && <ProcessCardBody item={item} align="left" />}</div>
      </div>

      {/* Mobile: single stacked column */}
      <div className="flex flex-col items-center gap-6 lg:hidden">
        <Node Icon={Icon} index={index} />
        <ProcessCardBody item={item} align="center" />
      </div>
    </div>
  );
}

function Node({ Icon, index }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative z-10 mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-[#F7F4EF] bg-[#C8A96A] text-white shadow-lg"
    >
      <Icon size={20} />
    </motion.div>
  );
}

function ProcessCardBody({ item, align }) {
  let alignment =
    align === "right"
      ? "items-end text-right ml-auto"
      : align === "left"
      ? "items-start text-left mr-auto"
      : "items-center text-center";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: align === "right" ? 30 : align === "left" ? -30 : 0,
        y: align === "center" ? 20 : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className={`flex max-w-md flex-col rounded-[28px] border border-[#E6DED2] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,.05)] ${alignment}`}
    >
      <span className="mb-2 font-serif text-3xl text-[#E6DED2]">{item.number}</span>
      <h3 className="mb-3 font-serif text-2xl leading-snug text-[#111111]">{item.title}</h3>
      <p className="text-sm leading-7 text-[#666]">{item.description}</p>
    </motion.div>
  );
}

export default ProcessCard;