// ==============================
// Section
// ==============================

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

// ==============================
// Stagger Container
// ==============================

export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

// ==============================
// Fade Up
// ==============================

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

// ==============================
// Fade Left
// ==============================

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

// ==============================
// Fade Right
// ==============================

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

// ==============================
// Navbar
// ==============================

export const navbarReveal = {
  hidden: {
    opacity: 0,
    y: -30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

// ==============================
// Background Zoom
// ==============================

export const backgroundZoom = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 1.08,

    transition: {
      duration: 20,
      ease: "linear",
    },
  },
};

// ==============================
// Floating Card
// ==============================

export const floatingCard = {
  animate: {
    y: [0, -12, 0],

    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ==============================
// Glass Glow
// ==============================

export const glassGlow = {
  animate: {
    opacity: [0.25, 0.45, 0.25],

    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ==============================
// Button Hover
// ==============================

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

// ==============================
// Card Hover
// ==============================

export const cardHover = {
  whileHover: {
    y: -8,

    transition: {
      duration: 0.3,
    },
  },
};

// ==============================
// Bottom Bar
// ==============================

export const bottomBarReveal = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// ==============================
// Scroll Indicator
// ==============================

export const scrollBounce = {
  animate: {
    y: [0, 10, 0],

    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ==============================
// Mouse Glow
// ==============================

export const mouseGlow = {
  animate: {
    opacity: [0.4, 1, 0.4],

    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

// ==============================
// Decorative Glow
// ==============================

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

// ==============================
// Image Reveal
// ==============================

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