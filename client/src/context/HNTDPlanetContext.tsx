// File: client/src/context/HNTDPlanetContext.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { createContext, useContext, useState } from 'react';

// ── Types ──────────────────────────────────────────────────────

// An item the explorer picks up and stores in the personal locker
export interface StoredItem {
  id:      string;
  name:    string;
  content: string;
  foundAt: string;
}

// How the explorer died — determines the death message and new-commander letter
export type DeathCause = 'suit' | 'oxygen' | 'battery';

// An entry added to the Survival Guide (either static data or unlocked via gameplay)
export interface SurvivalEntry {
  planet:   string;
  title:    string;
  content:  string;
  author:   string;
  date:     string;
  category: 'flora' | 'fauna' | 'hazard' | 'observation';
}

// ── Context type ───────────────────────────────────────────────
interface PlanetContextType {
  visitedPlanets:        string[];
  coordinatesFound:      boolean;
  storedItems:           StoredItem[];
  followedCoordsDoubt:   boolean;
  tinkeredScannerBrune:  boolean;
  deathEntries:          SurvivalEntry[];
  isNewCharacter:           boolean;
  lockerFirstOpened:        boolean;
  logsFirstOpened:          boolean;
  doubtVeraComplete:        boolean;
  bruneCoordinatesObtained: boolean;
  markPlanetVisited:         (key: string) => void;
  markCoordinatesFound:      () => void;
  markFollowedCoordsDoubt:   () => void;
  markTinkeredScannerBrune:  () => void;
  storeItem:                 (item: StoredItem) => void;
  addDeathEntry:             (entry: SurvivalEntry) => void;
  markNewCharacter:              () => void;
  markLockerOpened:              () => void;
  markLogsOpened:                () => void;
  markDoubtVeraComplete:         () => void;
  markBruneCoordinatesObtained:  () => void;
  hasVisited:                (key: string) => boolean;
  isPlanetThreeUnlocked:     () => boolean;
}

// ── Context creation ───────────────────────────────────────────
const HNTDPlanetContext = createContext<PlanetContextType | null>(null);

// ── Provider — tracks all in-session game state ────────────────
export const HNTDPlanetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── State — all game flags live here for the session ──────────
  const [visitedPlanets,       setVisitedPlanets]       = useState<string[]>([]);
  const [coordinatesFound,     setCoordinatesFound]     = useState(false);
  const [storedItems,          setStoredItems]          = useState<StoredItem[]>([]);
  const [followedCoordsDoubt,  setFollowedCoordsDoubt]  = useState(false);
  const [tinkeredScannerBrune, setTinkeredScannerBrune] = useState(false);
  const [deathEntries,         setDeathEntries]         = useState<SurvivalEntry[]>([]);
  const [isNewCharacter,            setIsNewCharacter]            = useState(false);
  const [lockerFirstOpened,         setLockerFirstOpened]         = useState(false);
  const [logsFirstOpened,           setLogsFirstOpened]           = useState(false);
  const [doubtVeraComplete,         setDoubtVeraComplete]         = useState(false);
  const [bruneCoordinatesObtained,  setBruneCoordinatesObtained]  = useState(false);

  // ── State mutation helpers — idempotent setters ────────────────
  const markPlanetVisited        = (key: string) =>
    setVisitedPlanets(prev => prev.includes(key) ? prev : [...prev, key]);
  const markCoordinatesFound     = () => setCoordinatesFound(true);
  const markFollowedCoordsDoubt  = () => setFollowedCoordsDoubt(true);
  const markTinkeredScannerBrune = () => setTinkeredScannerBrune(true);
  const storeItem                = (item: StoredItem) =>
    setStoredItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  const addDeathEntry            = (entry: SurvivalEntry) =>
    setDeathEntries(prev => prev.find(e => e.title === entry.title) ? prev : [...prev, entry]);
  const markNewCharacter             = () => setIsNewCharacter(true);
  const markLockerOpened             = () => setLockerFirstOpened(true);
  const markLogsOpened               = () => setLogsFirstOpened(true);
  const markDoubtVeraComplete        = () => setDoubtVeraComplete(true);
  const markBruneCoordinatesObtained = () => setBruneCoordinatesObtained(true);

  // ── Derived checks ──────────────────────────────���──────────────
  const hasVisited = (key: string) => visitedPlanets.includes(key);

  // Planet Three unlocks only after both Doubt and Brune are visited AND coordinates are entered
  const isPlanetThreeUnlocked = () =>
    visitedPlanets.includes('planetone') &&
    visitedPlanets.includes('planettwo') &&
    coordinatesFound;

  return (
    <HNTDPlanetContext.Provider value={{
      visitedPlanets, coordinatesFound, storedItems,
      followedCoordsDoubt, tinkeredScannerBrune,
      deathEntries, isNewCharacter, lockerFirstOpened, logsFirstOpened,
      doubtVeraComplete, bruneCoordinatesObtained,
      markPlanetVisited, markCoordinatesFound,
      markFollowedCoordsDoubt, markTinkeredScannerBrune,
      storeItem, addDeathEntry, markNewCharacter, markLockerOpened, markLogsOpened,
      markDoubtVeraComplete, markBruneCoordinatesObtained,
      hasVisited, isPlanetThreeUnlocked,
    }}>
      {children}
    </HNTDPlanetContext.Provider>
  );
};

// ── Hook — throws if used outside of HNTDPlanetProvider ───────
export const useHNTDPlanets = () => {
  const ctx = useContext(HNTDPlanetContext);
  if (!ctx) throw new Error('useHNTDPlanets must be used within HNTDPlanetProvider');
  return ctx;
};
