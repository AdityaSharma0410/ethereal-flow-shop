import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = (direction: 'left' | 'right' | 'up' | 'down' = 'up', delay: number = 0) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -100, opacity: 0, rotateY: -15 };
      case 'right':
        return { x: 100, opacity: 0, rotateY: 15 };
      case 'up':
        return { y: 50, opacity: 0, rotateX: -10 };
      case 'down':
        return { y: -50, opacity: 0, rotateX: 10 };
      default:
        return { y: 50, opacity: 0, rotateX: -10 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { x: 0, opacity: 1, rotateY: 0 };
      case 'up':
      case 'down':
        return { y: 0, opacity: 1, rotateX: 0 };
      default:
        return { y: 0, opacity: 1, rotateX: 0 };
    }
  };

  return {
    ref,
    initial: getInitialPosition(),
    animate: isInView ? getAnimatePosition() : getInitialPosition(),
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  };
};

// Enhanced Stagger animation for animated lists
export const useStaggerAnimation = (direction: 'left' | 'right' | 'up' | 'down' = 'up', staggerDelay: number = 0.1) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { 
          x: -150, 
          opacity: 0, 
          scale: 0.8, 
          rotateY: -20,
          filter: 'blur(10px)'
        };
      case 'right':
        return { 
          x: 150, 
          opacity: 0, 
          scale: 0.8, 
          rotateY: 20,
          filter: 'blur(10px)'
        };
      case 'up':
        return { 
          y: 80, 
          opacity: 0, 
          scale: 0.8, 
          rotateX: -15,
          filter: 'blur(10px)'
        };
      case 'down':
        return { 
          y: -80, 
          opacity: 0, 
          scale: 0.8, 
          rotateX: 15,
          filter: 'blur(10px)'
        };
      default:
        return { 
          y: 80, 
          opacity: 0, 
          scale: 0.8, 
          rotateX: -15,
          filter: 'blur(10px)'
        };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { 
          x: 0, 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          filter: 'blur(0px)'
        };
      case 'up':
      case 'down':
        return { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotateX: 0,
          filter: 'blur(0px)'
        };
      default:
        return { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotateX: 0,
          filter: 'blur(0px)'
        };
    }
  };

  return {
    containerRef,
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
          duration: 0.6,
        },
      },
    },
    itemVariants: {
      hidden: getInitialPosition(),
      visible: getAnimatePosition(),
    },
    isInView,
  };
};

// Enhanced Parallax scroll effect with 3D
export const useParallaxScroll = (speed: number = 0.5) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });

  return {
    ref,
    style: {
      transform: isInView ? `translateY(${speed * 50}px) translateZ(${speed * 20}px)` : 'translateY(0px) translateZ(0px)',
      transition: 'transform 0.3s ease-out',
    },
  };
};

// New: Animated list with hover effects
export const useAnimatedList = (staggerDelay: number = 0.08) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return {
    containerRef,
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
        },
      },
    },
    itemVariants: {
      hidden: { 
        opacity: 0, 
        y: 60, 
        scale: 0.9,
        rotateX: -10,
        filter: 'blur(8px)'
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      },
      hover: {
        y: -8,
        scale: 1.02,
        rotateX: 2,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        }
      }
    },
    isInView,
  };
};
