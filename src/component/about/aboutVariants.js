// =====================================
// Section Reveal
// =====================================

export const sectionReveal = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

// =====================================
// Stagger Container
// =====================================

export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

// =====================================
// Fade Up
// =====================================

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// =====================================
// Fade Left
// =====================================

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// =====================================
// Fade Right
// =====================================

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// =====================================
// Scale Reveal
// =====================================

export const scaleReveal = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// =====================================
// Image Reveal
// =====================================

export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.08,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// =====================================
// Floating Image
// =====================================

export const floatingImage = {
  animate: {
    y: [0, -12, 0],

    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// =====================================
// Card Hover
// =====================================

export const cardHover = {
  whileHover: {
    y: -8,
    scale: 1.02,

    transition: {
      duration: 0.3,
    },
  },
};

// =====================================
// Button Hover
// =====================================

export const buttonHover = {
  whileHover: {
    y: -4,
    scale: 1.02,

    transition: {
      duration: 0.25,
    },
  },

  whileTap: {
    scale: 0.98,
  },
};

// =====================================
// Timeline Line
// =====================================

export const timelineLine = {
  hidden: {
    height: 0,
  },

  visible: {
    height: "100%",

    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

// =====================================
// Timeline Item
// =====================================

export const timelineItem = {
  hidden: {
    opacity: 0,
    x: -30,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.6,
    },
  },
};

// =====================================
// Process Card
// =====================================

export const processCard = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// =====================================
// Decorative Glow
// =====================================

export const decorativeGlow = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.15, 0.35, 0.15],

    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// =====================================
// Background Zoom
// =====================================

export const backgroundZoom = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 1.06,

    transition: {
      duration: 20,
      ease: "linear",
    },
  },
};