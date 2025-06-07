// File: client/src/pages/portfolio/Home.tsx

import React from 'react';

const Home: React.FC = () => {
  console.log('✅ Home page rendered');

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: 'limegreen',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
      }}
    >
      <h1>Welcome to My Portfolio</h1>
      <p>This is a placeholder for the Home page.</p>
    </div>
  );
};

export default Home;
