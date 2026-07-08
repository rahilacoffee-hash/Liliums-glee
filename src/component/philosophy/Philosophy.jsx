import PhilosophyContent from "./PhilosophyContent";
import PhilosophyImage from "./PhilosophyImage";


function Philosophy() {
  return (
    <section className="bg-[#F7F4EF] py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 lg:flex-row">
        <PhilosophyContent />
        <PhilosophyImage />
      </div>
    </section>
  );
}

export default Philosophy;