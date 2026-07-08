
import bedroom from "../../assets/image/collections/wallpaper.jpeg";
import office from "../../assets/image/collections/decor.jpeg";

import {
  Home,
  ShieldCheck,
  Award,
  HeartHandshake,
} from "lucide-react";

const testimonialData = {
  eyebrow: "WHAT OUR CLIENTS SAY",

  title: "Spaces That Feel Like Home",

  description:
    "Every project is a collaboration built on trust, creativity, and attention to detail. Here's what our clients have to say about their experience working with Liliums Glee.",
};

export default testimonialData;

export const testimonials = [
  

  {
    id: 2,

    name: "Business Owner",

    location: "Lagos, Nigeria",

    project: "Luxury Office Interior",

    rating: 5,

    image: office,

    quote:
      "From the first design presentation to the final installation, every detail reflected professionalism and craftsmanship. Our office now perfectly represents our brand.",
  },

  {
    id: 3,

    name: "Property Developer",

    location: "Port Harcourt, Nigeria",

    project: "Modern Bedroom Design",

    rating: 5,

    image: bedroom,

    quote:
      "The team combined functionality with timeless aesthetics. They delivered beyond expectations while keeping the project organized and stress-free throughout.",
  },
];

export const testimonialFeatures = [
  {
    id: 1,
    icon: Home,

    title: "Personalized Approach",

    description:
      "Every interior is thoughtfully designed around your lifestyle, taste, and daily needs.",
  },

  {
    id: 2,
    icon: Award,

    title: "Quality & Excellence",

    description:
      "Premium materials, expert craftsmanship, and attention to every finishing detail.",
  },

  {
    id: 3,
    icon: HeartHandshake,

    title: "Client Focused",

    description:
      "We prioritize clear communication, collaboration, and complete client satisfaction.",
  },

  {
    id: 4,
    icon: ShieldCheck,

    title: "Trust & Reliability",

    description:
      "Reliable timelines, transparent processes, and lasting relationships built on trust.",
  },
];