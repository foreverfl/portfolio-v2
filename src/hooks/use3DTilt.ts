import { useEffect, useRef, useState } from 'react';

interface Tilt3DState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface Use3DTiltOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
  perspective?: number;
}

export const use3DTilt = (options: Use3DTiltOptions = {}) => {
  const {
    maxTilt = 15,
    scale = 1.05,
    speed = 400,
    glare = true,
    maxGlare = 0.35,
    perspective = 1000,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [tiltState, setTiltState] = useState<Tilt3DState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transition: 'opacity 0.3s ease-out',
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      // Get element box to convert screen coords -> local coords
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to center
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Normalize to [-1, +1] then scale by maxTilt (degrees)
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

      // Push new transform state (triggers React re-render)
      setTiltState({
        rotateX,
        rotateY,
        scale,
      });

      // Glare center in %, mapped to [0,100]
      if (glare) {
        const glareX = ((mouseX / rect.width) * 100) + 50;
        const glareY = ((mouseY / rect.height) * 100) + 50;

        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${maxGlare}) 0%, transparent 80%)`,
          opacity: 1,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        });
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      setIsHovering(true);
      // Immediately calculate position on enter
      handleMouseMove(e);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setTiltState({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      });

      if (glare) {
        setGlareStyle({
          opacity: 0,
          transition: 'opacity 0.3s ease-out',
        });
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovering, maxTilt, scale, glare, maxGlare]);

  const style: React.CSSProperties = {
    transform: `perspective(${perspective}px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg) scale(${tiltState.scale})`,
    transformStyle: 'preserve-3d',
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    willChange: 'transform',
  };

  return {
    ref,
    style,
    glareStyle,
  };
};