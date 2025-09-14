import React from 'react';

interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  style?: React.CSSProperties;
}

const Picture: React.FC<PictureProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  style = {}
}) => {
  // Extract base name without extension
  const baseName = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

  // Generate source sets for different formats
  const generateSrcSet = (format: string) => {
    const baseWithFormat = `${baseName}.${format}`;

    // Check if responsive sizes exist
    const sizes = [640, 960, 1280, 1920];
    const srcSetParts = sizes.map(size => {
      const sizedPath = `${baseName}-${size}.${format}`;
      return `${sizedPath} ${size}w`;
    });

    // Add original size as fallback
    srcSetParts.push(`${baseWithFormat} 2x`);

    return srcSetParts.join(', ');
  };

  // Fallback to original or WebP version
  const fallbackSrc = src.endsWith('.webp') ? src : `${baseName}.webp`;

  return (
    <picture>
      {/* AVIF format (best compression, newer browsers) */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif')}
        sizes={sizes}
      />

      {/* WebP format (good compression, wide support) */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
      />

      {/* Fallback image */}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        decoding="async"
      />
    </picture>
  );
};

export default Picture;