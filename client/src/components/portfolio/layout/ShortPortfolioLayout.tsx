import React, { ReactNode } from 'react';
import styles from '../../../assets/css/portfolio/layout/ShortPortfolioLayout.module.css'; 
import StarBackground from '../common/StarBackground';
import ShootingStar from '../common/ShootingStar';
import NavBar from './NavBar';
import Footer from './Footer';

interface ShortPortfolioLayoutProps {
  children: ReactNode;
}

const ShortPortfolioLayout: React.FC<ShortPortfolioLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.starLayer}>
        <StarBackground />
        <ShootingStar />
      </div>

      <NavBar />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default ShortPortfolioLayout;
