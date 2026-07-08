// whyChooseVariants.js

export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 80,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],

      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

export const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.18,
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
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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

export const imageHover = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.06,

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const featureReveal = {
  hidden: {
    opacity: 0,
    x: 25,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const featureHover = {
  rest: {
    x: 0,
    backgroundColor: "rgba(255,255,255,0)",
  },

  hover: {
    x: 8,
    backgroundColor: "rgba(200,169,106,.05)",

    transition: {
      duration: 0.3,
    },
  },
};

export const statsContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const statReveal = {
  hidden: {
    opacity: 0,
    y: 35,
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
};

export const statHover = {
  rest: {
    y: 0,
    boxShadow: "0 15px 40px rgba(0,0,0,.05)",
  },

  hover: {
    y: -8,
    boxShadow: "0 25px 60px rgba(0,0,0,.12)",

    transition: {
      duration: 0.3,
    },
  },
};

export const floatingCard = {
  animate: {
    y: [0, -12, 0],

    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const badgeFloat = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 2, 0],

    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const dividerReveal = {
  hidden: {
    width: 0,
  },

  visible: {
    width: 80,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const buttonVariants = {
  rest: {
    scale: 1,
  },

  hover: {
    scale: 1.03,

    transition: {
      duration: 0.3,
    },
  },

  tap: {
    scale: 0.97,
  },
};

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