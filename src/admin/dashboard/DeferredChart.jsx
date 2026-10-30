import { useEffect, useRef, useState } from "react";

function DeferredChart({ children, fallbackHeight = "420px" }) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: shouldRender ? undefined : fallbackHeight }}>
      {shouldRender ? children : <div className="h-full min-h-[280px] animate-pulse rounded-2xl bg-white" />}
    </div>
  );
}

export default DeferredChart;
