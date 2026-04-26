// File: client/src/context/HNTDPlanetContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface PlanetContextType {
  visitedPlanets:    string[];
  coordinatesFound:  boolean;
  markPlanetVisited: (key: string) => void;
  markCoordinatesFound: () => void;
  hasVisited:        (key: string) => boolean;
  isPlanetThreeUnlocked: () => boolean;
}

const HNTDPlanetContext = createContext<PlanetContextType | null>(null);

export const HNTDPlanetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitedPlanets,   setVisitedPlanets]   = useState<string[]>([]);
  const [coordinatesFound, setCoordinatesFound] = useState(false);

  const markPlanetVisited   = (key: string) =>
    setVisitedPlanets(prev => prev.includes(key) ? prev : [...prev, key]);

  const markCoordinatesFound = () => setCoordinatesFound(true);

  const hasVisited = (key: string) => visitedPlanets.includes(key);

  // Planet three unlocks only after visiting both AND finding the coordinates on Brune
  const isPlanetThreeUnlocked = () =>
    visitedPlanets.includes('planetone') &&
    visitedPlanets.includes('planettwo') &&
    coordinatesFound;

  return (
    <HNTDPlanetContext.Provider value={{
      visitedPlanets, coordinatesFound,
      markPlanetVisited, markCoordinatesFound,
      hasVisited, isPlanetThreeUnlocked,
    }}>
      {children}
    </HNTDPlanetContext.Provider>
  );
};

export const useHNTDPlanets = () => {
  const ctx = useContext(HNTDPlanetContext);
  if (!ctx) throw new Error('useHNTDPlanets must be used within HNTDPlanetProvider');
  return ctx;
};
