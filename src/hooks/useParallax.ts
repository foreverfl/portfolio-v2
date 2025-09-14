import { useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxConfig {
  offset?: number;
  speed?: number;
  opacity?: boolean;
  scale?: boolean;
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  config: ParallaxConfig = {}
) => {
  const { offset = 0, speed = 0.5, opacity = false, scale = false } = config;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset + 100 * speed, offset - 100 * speed]
  );

  const opacityValue = opacity
    ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    : undefined;

  const scaleValue = scale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    : undefined;

  return {
    y,
    opacity: opacityValue,
    scale: scaleValue,
    scrollYProgress
  };
};

export const useScrollReveal = (config?: {
  yOffset?: number;
  duration?: number;
  delay?: number;
  scale?: boolean;
}) => {
  const { yOffset = 80, duration = 0.8, delay = 0, scale = false } = config || {};

  return {
    initial: {
      opacity: 0,
      y: yOffset,
      ...(scale && { scale: 0.85 })
    },
    whileInView: {
      opacity: 1,
      y: 0,
      ...(scale && { scale: 1 })
    },
    viewport: { once: true, margin: '-100px' },
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  };
};