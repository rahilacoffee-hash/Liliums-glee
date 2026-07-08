export const sectionReveal = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

export const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
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

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
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
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const hoverLift = {
  whileHover: {
    y: -5,
    transition: {
      duration: 0.25,
    },
  },
};

export const linkHover = {
  rest: {
    x: 0,
    color: "rgba(255,255,255,.72)",
  },

  hover: {
    x: 8,
    color: "#C8A96A",
    transition: {
      duration: 0.25,
    },
  },
};

export const socialHover = {
  rest: {
    rotate: 0,
    scale: 1,
  },

  hover: {
    rotate: 8,
    scale: 1.12,
    transition: {
      duration: 0.25,
    },
  },
};

export const arrowHover = {
  rest: {
    x: 0,
    y: 0,
  },

  hover: {
    x: 3,
    y: -3,
    transition: {
      duration: 0.25,
    },
  },
};

export const underlineReveal = {
  hidden: {
    width: 0,
    opacity: 0,
  },

  visible: {
    width: 96,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const glowAnimation = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.25, 0.45, 0.25],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const backgroundGlow = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const dividerReveal = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },

  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const staggerList = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const listItem = {
  hidden: {
    opacity: 0,
    x: -20,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
    },
  },
};