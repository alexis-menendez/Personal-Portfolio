// File: client/src/components/portfolio/common/Clouds.tsx

import React from 'react';
import styles from '../../../assets/css/portfolio/common/Clouds.module.css';

const Clouds: React.FC = () => {
  return (
    <div className={styles.cloudLayer}>
      <img
        src="/assets/portfolio/images/art/cloud1.svg"
        alt="Cloud drifting"
        className={styles.cloud}
      />
    </div>
  );
};

export default Clouds;
