import type { Variants, Transition } from 'framer-motion';

// Premium easing curves (like Apple, Linear, Notion)
export const easings = {
  // Smooth deceleration - perfect for entrances
  smooth: [0.22, 1, 0.36, 1] as const,
  // Spring-like bounce
  spring: [0.34, 1.56, 0.64, 1] as const,
  // Gentle ease out
  gentle: [0.4, 0, 0.2, 1] as const,
  // Snappy for interactions
  snappy: [0.25, 0.46, 0.45, 0.94] as const,
  // Premium SaaS feel
  premium: [0.16, 1, 0.3, 1] as const,
};

// Default transition settings
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: easings.premium,
};

// Spring transition for natural motion
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// Stagger children delay
export const staggerDelay = 0.08;

// ============================================
// FADE UP - Most common entrance animation
// ============================================
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.premium,
    },
  },
};

// ============================================
// FADE IN - Simple opacity
// ============================================
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easings.gentle,
    },
  },
};

// ============================================
// SCALE UP - For cards, modals
// ============================================
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.premium,
    },
  },
};

// ============================================
// SLIDE IN FROM LEFT
// ============================================
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.premium,
    },
  },
};

// ============================================
// SLIDE IN FROM RIGHT
// ============================================
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.premium,
    },
  },
};

// ============================================
// STAGGER CONTAINER - Parent for staggered children
// ============================================
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// STAGGER ITEM - Child for staggered reveals
// ============================================
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.premium,
    },
  },
};

// ============================================
// HERO TEXT REVEAL - Word by word
// ============================================
export const heroTextReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

export const heroWord: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easings.premium,
    },
  },
};

// ============================================
// CARD HOVER - Premium hover effect
// ============================================
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easings.gentle,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: easings.gentle,
    },
  },
};

// ============================================
// GLOW PULSE - Subtle ambient animation
// ============================================
export const glowPulse: Variants = {
  initial: {
    opacity: 0.4,
    scale: 1,
  },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ============================================
// FLOATING - Gentle floating animation
// ============================================
export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ============================================
// UNLOCK REVEAL - For pricing cards
// ============================================
export const unlockReveal: Variants = {
  locked: {
    opacity: 0.3,
    filter: 'blur(8px)',
    scale: 0.98,
    y: 30,
  },
  unlocked: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.premium,
    },
  },
};

// ============================================
// ACCORDION - Smooth height animation
// ============================================
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: easings.gentle },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: easings.premium },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

// ============================================
// COUNTER - Number counting animation
// ============================================
export const counterReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

// ============================================
// ORB ANIMATION - For hero orb
// ============================================
export const orbFloat: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easings.premium,
    },
  },
};

// ============================================
// BUTTON HOVER - Interactive feedback
// ============================================
export const buttonHover = {
  rest: {
    scale: 1,
    transition: { duration: 0.2 },
  },
  hover: {
    scale: 1.03,
    transition: { duration: 0.2, ease: easings.snappy },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// ============================================
// LINE DRAW - SVG path animation
// ============================================
export const lineDraw: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: easings.gentle },
      opacity: { duration: 0.3 },
    },
  },
};

// ============================================
// NAV SCROLL - Navigation background on scroll
// ============================================
export const navBackground: Variants = {
  top: {
    backgroundColor: 'rgba(5, 5, 11, 0)',
    backdropFilter: 'blur(0px)',
  },
  scrolled: {
    backgroundColor: 'rgba(5, 5, 11, 0.8)',
    backdropFilter: 'blur(20px)',
    transition: {
      duration: 0.3,
      ease: easings.gentle,
    },
  },
};
