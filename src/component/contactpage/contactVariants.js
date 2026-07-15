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
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ================= Fade Left =================

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ================= Fade Right =================

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ================= Hero Image =================

export const heroImage = {
  hidden: {
    opacity: 0,
    scale: 1.08,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

// ================= Card =================

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },

  hover: {
    y: -8,

    transition: {
      duration: 0.3,
    },
  },
};

// ================= Icon =================

export const iconHover = {
  hover: {
    rotate: 8,
    scale: 1.12,

    transition: {
      duration: 0.3,
    },
  },
};

// ================= Form =================

export const formReveal = {
  hidden: {
    opacity: 0,
    x: 50,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// ================= Button =================

export const buttonHover = {
  hover: {
    scale: 1.04,

    transition: {
      duration: 0.25,
    },
  },

  tap: {
    scale: 0.97,
  },
};

// ================= FAQ =================

export const faqItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
    },
  },
};

// ================= Map =================

export const mapReveal = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.8,
    },
  },
};

// ================= CTA =================

export const ctaReveal = {
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