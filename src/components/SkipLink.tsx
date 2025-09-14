import React from 'react';
import './SkipLink.css';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => e.currentTarget.classList.add('focused')}
      onBlur={(e) => e.currentTarget.classList.remove('focused')}
    >
      Skip to main content
    </a>
  );
};