// File: client/src/context/HNTDPlanetContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface PlanetContextType {
  visitedPlanets: string[];
  markPlanetVisited: (key: string) => void;
  hasVisited: (key: string) => boolean;
  isPlanetThreeUnlocked: () => boolean;
}

const HNTDPlanetContext = createContext<PlanetContextType | null>(null);

export const HNTDPlanetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitedPlanets, setVisitedPlanets] = useState<string[]>([]);

  const markPlanetVisited = (key: string) =>
    setVisitedPlanets(prev => prev.includes(key) ? prev : [...prev, key]);

  const hasVisited = (key: string) => visitedPlanets.includes(key);

  const isPlanetThreeUnlocked = () =>
    visitedPlanets.includes('planetone') && visitedPlanets.includes('planettwo');

  return (
    <HNTDPlanetContext.Provider value={{ visitedPlanets, markPlanetVisited, hasVisited, isPlanetThreeUnlocked }}>
      {children}
    </HNTDPlanetContext.Provider>
  );
};

export const useHNTDPlanets = () => {
  const ctx = useContext(HNTDPlanetContext);
  if (!ctx) throw new Error('useHNTDPlanets must be used within HNTDPlanetProvider');
  return ctx;
};
