// ================= Container =================

export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// ================= Fade Up =================

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ================= Fade Left =================

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ================= Fade Right =================

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ================= Product Card =================

export const productCard = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  hover: {
    y: -10,

    transition: {
      duration: 0.35,
    },
  },
};

// ================= Image =================

export const imageHover = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.08,

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// ================= Overlay =================

export const overlayVariants = {
  rest: {
    opacity: 0.15,
  },

  hover: {
    opacity: 0.35,

    transition: {
      duration: 0.4,
    },
  },
};

// ================= Badge =================

export const badgeReveal = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      delay: 0.2,
      duration: 0.4,
    },
  },
};

// ================= Arrow =================

export const arrowVariants = {
  rest: {
    x: 0,
  },

  hover: {
    x: 6,

    transition: {
      duration: 0.25,
    },
  },
};

// ================= Price =================

export const priceHover = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.03,

    transition: {
      duration: 0.25,
    },
  },
};

// ================= Filter Button =================

export const filterButton = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.05,
    y: -2,

    transition: {
      duration: 0.25,
    },
  },

  tap: {
    scale: 0.97,
  },
};

// ================= CTA =================

export const buttonHover = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.03,

    transition: {
      duration: 0.25,
    },
  },

  
};

export const faqItem = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const featureCard = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  hover: {
    y: -8,
    transition: {
      duration: 0.3,
    },
  },
};