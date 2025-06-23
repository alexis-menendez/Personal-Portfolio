// File: client/src/components/portfolio/common/SectionWrapper.tsx

import React, { ReactNode } from 'react';
import styles from '../../../assets/css/portfolio/pageStyles/Home.module.css';

interface SectionWrapperProps {
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return (
    <div className={styles.textSection}>
      {children}
    </div>
  );
};

export default SectionWrapper;
