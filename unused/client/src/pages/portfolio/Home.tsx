// File: client/src/pages/portfolio/Home.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Home.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Cityscape — depth-layered, fixed to bottom horizon ── */}
      <div className={styles.cityscape}>

        {/* Back layer — furthest away, shortest */}
        <img src="/assets/portfolio/images/art/SoloTower2.png"
             className={`${styles.building} ${styles.b_soloTower2}`} alt="" />

        {/* Mid layer */}
        <img src="/assets/portfolio/images/art/TwoTowers.png"
             className={`${styles.building} ${styles.b_twoTowers}`} alt="" />
        <img src="/assets/portfolio/images/art/BackgroundBuildings2.png"
             className={`${styles.building} ${styles.b_buildings2}`} alt="" />

        {/* Near layer */}
        <img src="/assets/portfolio/images/art/BakcgroundTowers1.png"
             className={`${styles.building} ${styles.b_towers1}`} alt="" />
        <img src="/assets/portfolio/images/art/SoloTower1.png"
             className={`${styles.building} ${styles.b_soloTower1}`} alt="" />

        {/* Focal centerpiece — tallest, center-right */}
        <img src="/assets/portfolio/images/art/BackgroundTowers3.png"
             className={`${styles.building} ${styles.b_towers3}`} alt="" />

        {/* Ground glow */}
        <div className={styles.groundGlow} aria-hidden="true" />
      </div>

      {/* ── Text — floats in the left sky above the city ── */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>// Full-Stack Developer</p>
        <h1 className={styles.name}>
          Alex<br />Menendez
        </h1>
        <div className={styles.nameLine} />
        <p className={styles.bio}>
          I build beautiful, functional web experiences — with a soft spot for
          creative design, playful interfaces, and making the web a little more magical.
          When I'm not coding, you'll find me dancing, painting, or sculpting
          something weird and wonderful.
        </p>
        <button className={styles.cta} onClick={() => navigate('/resume')}>
          View Resume →
        </button>
      </div>
    </>
  );
};

export default Home;
