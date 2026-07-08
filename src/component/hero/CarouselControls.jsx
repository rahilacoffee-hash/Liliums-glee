import { ChevronLeft, ChevronRight } from "lucide-react";

function CarouselControls({ onPrev, onNext }) {
  return (
    <>
      <button
        onClick={onPrev}
        aria-label="Previous slide"
        className="absolute left-[calc(50%-20px)] top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:flex"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={onNext}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:flex"
      >
        <ChevronRight size={18} />
      </button>
    </>
  );
}

export default CarouselControls;