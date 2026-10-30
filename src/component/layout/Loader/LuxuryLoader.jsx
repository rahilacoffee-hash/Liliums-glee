function LuxuryLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F5F0]">
      <div className="flex h-28 w-28 animate-[spin_2s_linear_infinite] items-center justify-center rounded-full border border-[#D7BE8A]">
        <h1 className="animate-pulse font-serif text-4xl italic text-[#C8A96A]">L</h1>
      </div>

      <h2 className="mt-8 animate-pulse font-serif text-2xl tracking-[6px] text-[#111111]">
        LILIUM'S GLEE
      </h2>

      <p className="mt-3 animate-pulse text-sm tracking-[2px] text-gray-500">
        Crafting Timeless Interiors
      </p>

      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            style={{ animationDelay: `${item * 0.2}s` }}
            className="h-2 w-2 animate-bounce rounded-full bg-[#C8A96A]"
          />
        ))}
      </div>
    </div>
  );
}

export default LuxuryLoader;
