function Pagination({ count, current, onSelect }) {
  return (
    <div className="mt-12 flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? "w-6 bg-[#D6A354]" : "w-1.5 bg-white/25"
          }`}
        />
      ))}
    </div>
  );
}

export default Pagination;