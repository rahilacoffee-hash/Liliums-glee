// productVariants.js

export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

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

export const productCard = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  hover: {
    y: -12,

    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export const imageHover = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.08,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const buttonHover = {
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

export const badgeReveal = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      delay: 0.3,
      duration: 0.35,
    },
  },
};

export const priceHover = {
  rest: {
    color: "#111111",
  },

  hover: {
    color: "#C8A96A",

    transition: {
      duration: 0.3,
    },
  },
};

export const overlayVariants = {
  rest: {
    opacity: 0,
  },

  hover: {
    opacity: 0.08,

    transition: {
      duration: 0.35,
    },
  },
};