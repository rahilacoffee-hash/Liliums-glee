export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
    },
  },
};

export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1,
    },
  },
};