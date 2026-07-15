// ================= Images =================

import wallpaper from "../../assets/image/collections/wallpaper.jpeg";
import wallTreatment from "../../assets/image/collections/wall-treatment.jpeg";
import curtains from "../../assets/image/collections/curtains.jpeg";
import lighting from "../../assets/image/collections/lighting.jpeg";
import decor from "../../assets/image/collections/decor.jpeg";

// ================= Section Data =================

const collectionsData = {
  eyebrow: "Specialized Collections",

  title: "Luxury Interior",

  highlight: "Products",

  description:
    "Discover our carefully curated selection of premium wallpapers, wall treatments, curtains, lighting, and décor accessories designed to transform every space.",

  button: {
    label: "View All Products",
    href: "/shop",
  },

  // ================= Featured Collection =================

  featuredCollection: {
    eyebrow: "Featured Collection",

    title: "Luxury Wallpaper Collection",

    description:
      "Discover timeless wallpaper collections crafted with premium finishes, elegant textures, and sophisticated designs for modern interiors.",

    image: wallpaper,

    button: {
      label: "Explore Collection",
      href: "/shop/wallpapers",
    },
  },

  // ================= Why Shop =================

  whyShop: [
    {
      id: 1,
      title: "Premium Quality",
      description:
        "Every product is sourced from trusted manufacturers with exceptional craftsmanship.",
    },

    {
      id: 2,
      title: "Expert Consultation",
      description:
        "Our interior specialists help you choose the perfect products for your space.",
    },

    {
      id: 3,
      title: "Professional Installation",
      description:
        "Experienced installers ensure flawless execution from start to finish.",
    },

    {
      id: 4,
      title: "Nationwide Delivery",
      description:
        "Fast and reliable delivery across Nigeria for every order.",
    },
  ],

  // ================= FAQ =================

  faq: [
    {
      id: 1,
      question: "Do you deliver nationwide?",
      answer:
        "Yes. We deliver our products across Nigeria using trusted logistics partners.",
    },

    {
      id: 2,
      question: "Do you offer installation services?",
      answer:
        "Absolutely. We provide professional installation for wallpapers, wall treatments, curtains, blinds, and more.",
    },

    {
      id: 3,
      question: "Can I customize my order?",
      answer:
        "Yes. Selected products are available in custom sizes, colours, and finishes depending on your project requirements.",
    },

    {
      id: 4,
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes between 3–7 working days depending on your location and product availability.",
    },
  ],

  // ================= CTA =================

  cta: {
    eyebrow: "Let's Create Something Beautiful",

    title: "Ready To Transform Your Space?",

    description:
      "Browse our premium collections or speak with our interior experts for personalized recommendations.",

    primaryButton: {
      label: "Shop Now",
      href: "/shop",
    },

    secondaryButton: {
      label: "Book Consultation",
      href: "/contact",
    },
  },
};

export default collectionsData;

// ================= Filter Categories =================

export const productCategories = [
  "All",
  "Wall Treatments",
  "Wallpapers",
  "Curtains",
  "Lighting",
  "Accessories",
];

// ================= Featured Products =================

export const featuredProducts = [
  {
    id: 1,
    slug: "premium-wall-treatment",
    name: "Premium Wall Treatment",
    category: "Wall Treatments",
    description:
      "Elegant textured wall finishes crafted for luxurious interiors.",
    price: "₦45,000",
    image: wallTreatment,
    badge: "Best Seller",
    rating: 5,
    reviews: 24,
  },

  {
    id: 2,
    slug: "italian-wallpaper",
    name: "Italian Luxury Wallpaper",
    category: "Wallpapers",
    description:
      "Premium imported wallpaper with timeless patterns and textures.",
    price: "₦38,000",
    image: wallpaper,
    badge: "New",
    rating: 5,
    reviews: 18,
  },

  {
    id: 3,
    slug: "luxury-curtains",
    name: "Luxury Curtains",
    category: "Curtains",
    description:
      "Custom-made curtains offering elegance and perfect light control.",
    price: "₦65,000",
    image: curtains,
    badge: "Popular",
    rating: 4,
    reviews: 31,
  },

  {
    id: 4,
    slug: "decorative-lighting",
    name: "Decorative Lighting",
    category: "Lighting",
    description:
      "Statement lighting fixtures that elevate ambience beautifully.",
    price: "₦82,000",
    image: lighting,
    badge: "Featured",
    rating: 5,
    reviews: 15,
  },

  {
    id: 5,
    slug: "decor-accessories",
    name: "Decor Accessories",
    category: "Accessories",
    description:
      "Luxury decorative accessories for refined living spaces.",
    price: "₦22,000",
    image: decor,
    badge: "Trending",
    rating: 5,
    reviews: 27,
  },

  {
    id: 6,
    slug: "modern-wall-panel",
    name: "Modern Wall Panel",
    category: "Wall Treatments",
    description:
      "Contemporary wall panels with premium finishes and elegant textures.",
    price: "₦55,000",
    image: wallTreatment,
    badge: "Premium",
    rating: 5,
    reviews: 12,
  },
];