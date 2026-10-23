// ================= Images =================
import heroImage from "../../assets/image/collections/wallpaper.jpeg";
import ctaImage from "../../assets/image/collections/wall-treatment.jpeg";

// ================= Contact Page Data =================

const contactData = {
  // ================= Hero =================

  hero: {
    eyebrow: "Contact & Consultation",

    title: "Let's Create Your Dream Space.",

    description:
      "We're here to help you bring elegance, comfort, and functionality into your home or commercial space. Book a consultation with our design experts today.",

    image: heroImage,

    primaryButton: {
      label: "Book Consultation",
      href: "#consultation",
    },

    secondaryButton: {
      label: "View Our Services",
      href: "/services",
    },
  },

  // ================= Contact Information =================

  info: {
    address: {
      title: "Address",

      value:
        "The Mall Dubia, Abuja, Nigeria",
    },

    phone: {
      title: "Phone",

      value: [
        "08058814841",
      ],
    },

    email: {
      title: "Email",

      value: [
        "",
        "",
      ],
    },

    hours: {
      title: "Business Hours",

      value: [
        "Monday - Friday : 9:00 AM - 6:00 PM",
        "Saturday : 10:00 AM - 2:00 PM",
        "Sunday : Closed",
      ],
    },

    socials: [
      {
        name: "tiktok",
        href: "https://facebook.com",
      },

      {
        name: "Instagram",
        href: "https://instagram.com",
      },

      
    ],
  },

  // ================= Consultation Form =================

  form: {
    title: "Book Your Consultation",

    button: "Book Consultation",

    projectTypes: [
      "Residential",
      "Commercial",
      "Office",
      "Hotel",
      "Retail",
      "Other",
    ],

    services: [
      "Wall Treatments",
      "Luxury Wallpapers",
      "Curtains & Blinds",
      "Decorative Lighting",
      "Furniture",
      "Interior Styling",
      "Complete Interior Design",
    ],

    budgets: [
      "₦500k - ₦1M",
      "₦1M - ₦3M",
      "₦3M - ₦5M",
      "₦5M+",
    ],
  },

  // ================= Why Choose Us =================

  whyChoose: [
    {
      id: 1,

      title: "Expert Designers",

      description:
        "Experienced professionals creating elegant and functional interiors.",
    },

    {
      id: 2,

      title: "Premium Materials",

      description:
        "Only high-quality finishes sourced from trusted manufacturers.",
    },

    {
      id: 3,

      title: "Custom Solutions",

      description:
        "Every project is tailored to your style, lifestyle, and budget.",
    },

    {
      id: 4,

      title: "Nationwide Service",

      description:
        "Consultation, delivery, and installation across Nigeria.",
    },
  ],

  // ================= Studio =================

 studio: {
  title: "Visit Our Studio",

  description:
    "Experience our curated collections in person and speak directly with our interior specialists.",

  location: "The Mall Dubia, Abuja, Nigeria",

  button: {
    label: "Get Directions",

    href: "https://maps.google.com/?q=The+Mall+Dubia+Abuja+Nigeria",
  },
},

  // ================= FAQ =================

  faq: [
    {
      id: 1,

      question: "How do I book a consultation?",

      answer:
        "Simply complete the consultation form and our team will contact you within 24 hours to schedule your appointment.",
    },

    {
      id: 2,

      question: "Do you offer virtual consultations?",

      answer:
        "Yes. We offer both virtual and in-person consultations depending on your location and preference.",
    },

    {
      id: 3,

      question: "Which areas do you serve?",

      answer:
        "We provide interior design services across Nigeria with nationwide delivery and installation.",
    },

    {
      id: 4,

      question: "How long does a project take?",

      answer:
        "Project timelines depend on size and scope, but we'll provide a detailed schedule after the consultation.",
    },
  ],

  // ================= CTA =================

  cta: {
    eyebrow: "Luxury Starts Here",

    title: "Ready To Transform Your Space?",

    description:
      "Book your consultation today and let our designers help bring your vision to life.",

    image: ctaImage,

    primaryButton: {
      label: "Book Consultation",

      href: "#consultation",
    },
  },
};

export default contactData;
