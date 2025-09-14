import React from 'react';

interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

const Picture: React.FC<PictureProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
}) => {
  // Remove extension from src
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '');
  const originalExt = src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg';

  return (
    <picture>
      <source srcSet={`${basePath}.avif`} type="image/avif" />
      <source srcSet={`${basePath}.webp`} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        decoding="async"
      />
    </picture>
  );
};

export default Picture;