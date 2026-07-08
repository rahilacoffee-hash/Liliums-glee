import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function MotionCounter({
  value,
  duration = 2,
  suffix = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(0, Number(value), {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = `${Math.floor(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [value, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}