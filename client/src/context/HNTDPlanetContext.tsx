// File: client/src/context/HNTDPlanetContext.tsx

import React, { createContext, useContext, useState } from 'react';

export interface StoredItem {
  id:      string;
  name:    string;
  content: string;
  foundAt: string;
}

export type DeathCause = 'suit' | 'oxygen' | 'battery';

export interface SurvivalEntry {
  planet:   string;
  title:    string;
  content:  string;
  author:   string;
  date:     string;
  category: 'flora' | 'fauna' | 'hazard' | 'observation';
}

interface PlanetContextType {
  visitedPlanets:        string[];
  coordinatesFound:      boolean;
  storedItems:           StoredItem[];
  followedCoordsDoubt:   boolean;
  tinkeredScannerBrune:  boolean;
  deathEntries:          SurvivalEntry[];
  isNewCharacter:        boolean;
  lockerFirstOpened:     boolean;
  markPlanetVisited:         (key: string) => void;
  markCoordinatesFound:      () => void;
  markFollowedCoordsDoubt:   () => void;
  markTinkeredScannerBrune:  () => void;
  storeItem:                 (item: StoredItem) => void;
  addDeathEntry:             (entry: SurvivalEntry) => void;
  markNewCharacter:          () => void;
  markLockerOpened:          () => void;
  hasVisited:                (key: string) => boolean;
  isPlanetThreeUnlocked:     () => boolean;
}

const HNTDPlanetContext = createContext<PlanetContextType | null>(null);

export const HNTDPlanetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitedPlanets,       setVisitedPlanets]       = useState<string[]>([]);
  const [coordinatesFound,     setCoordinatesFound]     = useState(false);
  const [storedItems,          setStoredItems]          = useState<StoredItem[]>([]);
  const [followedCoordsDoubt,  setFollowedCoordsDoubt]  = useState(false);
  const [tinkeredScannerBrune, setTinkeredScannerBrune] = useState(false);
  const [deathEntries,         setDeathEntries]         = useState<SurvivalEntry[]>([]);
  const [isNewCharacter,       setIsNewCharacter]       = useState(false);
  const [lockerFirstOpened,    setLockerFirstOpened]    = useState(false);

  const markPlanetVisited        = (key: string) =>
    setVisitedPlanets(prev => prev.includes(key) ? prev : [...prev, key]);
  const markCoordinatesFound     = () => setCoordinatesFound(true);
  const markFollowedCoordsDoubt  = () => setFollowedCoordsDoubt(true);
  const markTinkeredScannerBrune = () => setTinkeredScannerBrune(true);
  const storeItem                = (item: StoredItem) =>
    setStoredItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  const addDeathEntry            = (entry: SurvivalEntry) =>
    setDeathEntries(prev => prev.find(e => e.title === entry.title) ? prev : [...prev, entry]);
  const markNewCharacter         = () => setIsNewCharacter(true);
  const markLockerOpened         = () => setLockerFirstOpened(true);

  const hasVisited = (key: string) => visitedPlanets.includes(key);

  const isPlanetThreeUnlocked = () =>
    visitedPlanets.includes('planetone') &&
    visitedPlanets.includes('planettwo') &&
    coordinatesFound;

  return (
    <HNTDPlanetContext.Provider value={{
      visitedPlanets, coordinatesFound, storedItems,
      followedCoordsDoubt, tinkeredScannerBrune,
      deathEntries, isNewCharacter, lockerFirstOpened,
      markPlanetVisited, markCoordinatesFound,
      markFollowedCoordsDoubt, markTinkeredScannerBrune,
      storeItem, addDeathEntry, markNewCharacter, markLockerOpened,
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
