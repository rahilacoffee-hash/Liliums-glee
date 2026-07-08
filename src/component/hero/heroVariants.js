// heroVariants.js

// ---------- Parent Container ----------

export const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

// ---------- Fade Up ----------

export const fadeUp = {
  initial: {
    opacity: 0,
    y: 35,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ---------- Heading Reveal ----------

export const headingReveal = {
  initial: {
    opacity: 0,
    y: 80,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ---------- Divider ----------

export const dividerVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  animate: {
    width: 60,
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// ---------- Image ----------

export const imageVariants = {
  initial: {
    opacity: 0,
    scale: 1.08,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 1.03,
    transition: {
      duration: 0.6,
    },
  },
};
// ---------- Floating Card ----------

export const productCardVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.6,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

// ---------- Hotspots ----------

export const hotspotVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1,
      duration: 0.4,
    },
  },
};

// ---------- Navigation ----------

export const navButtonVariants = {
  whileHover: {
    scale: 1.08,
    backgroundColor: "#C8A96A",
    color: "#111111",
  },
  whileTap: {
    scale: 0.95,
  },
};

// ---------- Primary Button ----------

export const primaryButtonVariants = {
  whileHover: {
    y: -3,
    scale: 1.02,
    transition: {
      duration: 0.25,
    },
  },
  whileTap: {
    scale: 0.97,
  },
};

// ---------- Secondary Button ----------

export const secondaryButtonVariants = {
  whileHover: {
    y: -3,
    transition: {
      duration: 0.25,
    },
  },
};

// ---------- Arrow ----------

export const arrowVariants = {
  whileHover: {
    x: 4,
    transition: {
      duration: 0.25,
    },
  },
};

// ---------- Infinite Image Zoom ----------

export const imageZoom = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  },
};