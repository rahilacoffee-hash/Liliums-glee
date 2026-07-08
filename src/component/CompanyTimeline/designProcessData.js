import {
  Search,
  PenTool,
  Hammer,
  Sofa,
} from "lucide-react";

const processContent = {
  eyebrow: "OUR DESIGN PROCESS",

  title: "From Vision to",

  highlight: "Beautiful Reality",

  description:
    "Every project follows a carefully refined process that transforms ideas into timeless interiors. From the first consultation to the final styling, every detail is thoughtfully considered.",
};

export default processContent;

export const processSteps = [
  {
    id: 1,
    number: "01",
    icon: Search,

    title: "Discover",

    description:
      "We learn about your lifestyle, preferences and functional needs through in-depth consultations and site assessments.",
  },

  {
    id: 2,
    number: "02",
    icon: PenTool,

    title: "Design",

    description:
      "Our designers develop concepts, mood boards, layouts and realistic 3D visualizations tailored to your vision.",
  },

  {
    id: 3,
    number: "03",
    icon: Hammer,

    title: "Build",

    description:
      "Our experienced craftsmen bring the approved design to life using premium materials and exceptional attention to detail.",
  },

  {
    id: 4,
    number: "04",
    icon: Sofa,

    title: "Style",

    description:
      "Furniture, lighting, décor and accessories are carefully curated to create elegant, functional and timeless spaces.",
  },
];