const servicesData = {
  // =====================================
  // Hero
  // =====================================

  hero: {
    eyebrow: "Our Services",

    title: "Designing Spaces That Inspire Everyday Living.",

    description:
      "From luxury wall treatments to complete interior transformations, we create elegant spaces tailored to your lifestyle, vision, and personality.",

     image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
  },

  // =====================================
  // Services
  // =====================================

  services: [
    {
      id: 1,

      title: "Interior Design",

      slug: "interior-design",

      description:
        "Complete interior design solutions that blend elegance, comfort, and functionality.",

    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600",

      icon: "Sofa",

      features: [
        "Space Planning",
        "Furniture Selection",
        "Color Consultation",
        "Lighting Design",
      ],
    },

    {
      id: 2,

      title: "Wall Treatments",

      slug: "wall-treatments",

      description:
        "Luxury wallpapers, decorative panels, mouldings, and textured wall finishes.",

          image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600",

      icon: "Paintbrush",

      features: [
        "Wallpaper Installation",
        "Wall Panels",
        "Decorative Moulding",
        "Feature Walls",
      ],
    },

    {
      id: 3,

      title: "Window Treatments",

      slug: "window-treatments",

      description:
        "Elegant curtains, blinds, and custom window solutions that complete every room.",

        image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600",

      icon: "Blinds",

      features: [
        "Curtains",
        "Blinds",
        "Sheers",
        "Motorized Options",
      ],
    },

    {
      id: 4,

      title: "Space Styling",

      slug: "space-styling",

      description:
        "Thoughtfully curated décor and finishing touches that bring your space to life.",

        image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600",

      icon: "Sparkles",

      features: [
        "Home Styling",
        "Accessories",
        "Decor Placement",
        "Seasonal Styling",
      ],
    },

    {
      id: 5,

      title: "Consultation",

      slug: "consultation",

      description:
        "Professional design guidance to help you confidently plan your next project.",

       image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600",

      icon: "MessageCircle",

      features: [
        "Design Advice",
        "Material Selection",
        "Project Planning",
        "Budget Guidance",
      ],
    },
  ],

  // =====================================
  // Why Choose Us
  // =====================================

  whyChoose: [
    {
      id: 1,
      title: "Tailored Designs",
      description:
        "Every project is uniquely designed to match your style and needs.",
    },

    {
      id: 2,
      title: "Premium Materials",
      description:
        "We source high-quality materials that combine beauty with durability.",
    },

    {
      id: 3,
      title: "Expert Craftsmanship",
      description:
        "Every finish reflects precision, care, and exceptional attention to detail.",
    },

    {
      id: 4,
      title: "Client First",
      description:
        "Your satisfaction guides every decision from concept to completion.",
    },
  ],

  // =====================================
  // FAQ
  // =====================================

  faq: [
    {
      id: 1,
      question: "Do you offer site visits?",

      answer:
        "Yes. We schedule consultations and site visits to understand your space before recommending solutions.",
    },

    {
      id: 2,
      question: "Can I hire you for one room only?",

      answer:
        "Absolutely. Whether it's one room or an entire property, every project receives the same level of attention.",
    },

    {
      id: 3,
      question: "Do you supply materials?",

      answer:
        "Yes. We can source premium wallpapers, mouldings, fabrics, and other interior finishes for your project.",
    },

    {
      id: 4,
      question: "How long does a project take?",

      answer:
        "Project timelines vary depending on scope, but we'll provide a clear schedule before work begins.",
    },
  ],

  // =====================================
  // CTA
  // =====================================

  cta: {
    eyebrow: "Let's Work Together",

    title: "Ready To Elevate Your Space?",

    description:
      "Whether you're planning a complete renovation or adding the perfect finishing touches, we're here to bring your vision to life.",

    button: {
      text: "Book a Consultation",

      href: "/contact",
    },
  },
};

export default servicesData;