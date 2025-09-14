import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  reducedMotionFallback?: MotionProps;
}

/**
 * Wrapper component that respects user's motion preferences
 * Provides gentler animations when reduced motion is preferred
 */
export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  reducedMotionFallback,
  initial,
  animate,
  exit,
  transition,
  whileHover,
  whileTap,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, use simpler animations
  if (prefersReducedMotion) {
    const reducedProps: MotionProps = reducedMotionFallback || {
      initial: false,
      animate: animate,
      exit: undefined,  // exit should be undefined, not false
      transition: { duration: 0.01 },
      whileHover: undefined,
      whileTap: undefined,
    };

    return (
      <motion.div {...rest} {...reducedProps}>
        {children}
      </motion.div>
    );
  }

  // Normal animations
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/**
 * Hook to get motion-aware animation values
 */
export const useMotionValue = (normalValue: any, reducedValue: any) => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedValue : normalValue;
};