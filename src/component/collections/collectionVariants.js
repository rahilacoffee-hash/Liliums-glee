// collectionVariants.js

export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 80,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
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
      duration: 0.8,
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

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 60,
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

export const textReveal = {
  hidden: {
    opacity: 0,
    y: 25,
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

export const overlayVariants = {
  rest: {
    opacity: 0.15,
  },

  hover: {
    opacity: 0.55,

    transition: {
      duration: 0.4,
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
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0px 20px 50px rgba(0,0,0,.08)",
  },

  hover: {
    y: -10,
    boxShadow: "0px 35px 70px rgba(0,0,0,.18)",

    transition: {
      duration: 0.35,
    },
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

export const featureVariants = {
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