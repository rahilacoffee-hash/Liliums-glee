export const sectionReveal = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.18,
    },
  },
};

export const overlayReveal = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
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

export const headingReveal = {
  hidden: {
    opacity: 0,
    y: 70,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const buttonContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const buttonReveal = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export const primaryButtonVariants = {
  whileHover: {
    scale: 1.04,
    transition: {
      duration: 0.25,
    },
  },

  whileTap: {
    scale: 0.98,
  },
};

export const secondaryButtonVariants = {
  whileHover: {
    scale: 1.03,
    backgroundColor: "rgba(255,255,255,.12)",
    transition: {
      duration: 0.25,
    },
  },

  whileTap: {
    scale: 0.98,
  },
};

export const arrowVariants = {
  whileHover: {
    x: 4,
  },
};

export const statsContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

export const statCardReveal = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const floatingCard = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const backgroundZoom = {
  initial: {
    scale: 1,
  },

  animate: {
    scale: 1.08,
    transition: {
      duration: 18,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export const glowAnimation = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.35, 0.6, 0.35],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};