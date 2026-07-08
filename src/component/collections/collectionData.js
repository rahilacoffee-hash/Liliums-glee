// Replace these with your actual images
import heroCollection from "../../assets/image/collections/hero.jpeg";
import wallTreatment from "../../assets/image/collections/wall-treatment.jpeg";
import wallpaper from "../../assets/image/collections/wallpaper.jpeg";
import curtains from "../../assets/image/collections/curtains.jpeg";
import lighting from "../../assets/image/collections/lighting.jpeg";
import decor from "../../assets/image/collections/decor.jpeg";

const collectionData = {
  eyebrow: "Signature Collections",

  title: "Curated for",

  highlight: "Beautiful Living",

  description:
    "Discover premium interior finishes, decorative elements, and carefully selected materials designed to transform every space into a timeless expression of elegance and comfort.",

  cta: "View All Collections",
};

export default collectionData;

export const collections = [
  {
    id: 1,
    title: "Wall Treatments",
    slug: "wall-treatments",
    image: wallTreatment,

    description:
      "Luxury textured wall finishes, decorative panels and custom feature walls that elevate modern interiors.",

    products: 24,

    featured: true,

    size: "large",
  },

  {
    id: 2,
    title: "Luxury Wallpapers",
    slug: "wallpapers",
    image: wallpaper,

    description:
      "Premium wallpapers curated from timeless collections to add depth, texture and personality.",

    products: 18,

    featured: false,

    size: "medium",
  },

  {
    id: 3,
    title: "Curtains & Blinds",
    slug: "curtains-blinds",
    image: curtains,

    description:
      "Custom-made curtains and blinds crafted for elegance, privacy and perfect light control.",

    products: 36,

    featured: false,

    size: "medium",
  },

  {
    id: 4,
    title: "Decorative Lighting",
    slug: "lighting",
    image: lighting,

    description:
      "Statement lighting fixtures that enhance ambience while becoming the focal point of every room.",

    products: 16,

    featured: false,

    size: "medium",
  },

  {
    id: 5,
    title: "Décor Accessories",
    slug: "decor-accessories",
    image: decor,

    description:
      "Handpicked decorative accessories that complete every interior with warmth and sophistication.",

    products: 42,

    featured: false,

    size: "medium",
  },
];

export const collectionHero = {
  image: heroCollection,

  title: "Luxury Interior Finishes",

  description:
    "Every collection is carefully selected to help you create elegant spaces with premium quality materials and timeless design.",

  button: "Explore Collections",
};

export const collectionFeatures = [
  {
    id: 1,
    title: "Premium Quality",

    description: "Finest materials with exceptional craftsmanship.",
  },

  {
    id: 2,
    title: "Curated Selection",

    description: "Handpicked products for timeless interiors.",
  },

  {
    id: 3,
    title: "Custom Solutions",

    description: "Tailored recommendations for every project.",
  },

  {
    id: 4,
    title: "Expert Guidance",

    description: "Professional advice from concept to completion.",
  },
];