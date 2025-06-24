// File: client/src/components/portfolio/common/LazyImage.tsx

import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderSrc,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? 'loaded' : 'loading'}`}
        {...rest}
      />
      {placeholderSrc && !loaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="lazy-image-placeholder"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        />
      )}
    </>
  );
};

export default LazyImage;

