import {
  Award,
  Building2,
  Headphones,
} from "lucide-react";

const ctaData = {
  eyebrow: "LET'S BUILD TOGETHER",

  title: "Your Dream Space",

  highlight: "Starts Here",

  description:
    "Whether you're planning a new build, transforming your interiors, or enhancing your space with premium wall treatments and finishes, our team is ready to bring your vision to life with creativity, craftsmanship, and attention to detail.",

  primaryButton: {
    text: "Book a Consultation",
    href: "/contact",
  },

  secondaryButton: {
    text: "View Our Projects",
    href: "/projects",
  },
};

export default ctaData;

export const ctaStats = [
  {
    id: 1,
    value: "16+",
    label: "Years of Experience",
    icon: Award,
  },

  {
    id: 2,
    value: "100+",
    label: "Projects Delivered",
    icon: Building2,
  },

  {
    id: 3,
    value: "24/7",
    label: "Client Support",
    icon: Headphones,
  },
];