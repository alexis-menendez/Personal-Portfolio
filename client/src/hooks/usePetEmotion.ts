// File: client/src/hooks/usePetEmotion.ts

import { useState, useEffect } from 'react';

type Mood = 'idle' | 'happy' | 'sad' | 'tired' | 'playful' | 'angry' | 'focused' | 'inspired' | 'lonely';
type AnimationKey =
  | 'idle'
  | 'walk'
  | 'legLift'
  | 'fall'
  | 'jump'
  | 'jumpslam'
  | 'inksquirt'
  | 'attackDown'
  | 'attackUp'
  | 'hurt'
  | 'die'
  | 'win';

const moodToAnimation: Record<Mood, AnimationKey> = {
  idle: 'idle',
  happy: 'jump',
  tired: 'fall',
  playful: 'legLift',
  angry: 'attackDown',
  sad: 'hurt',
  focused: 'walk',
  inspired: 'jumpslam', 
  lonely: 'idle', 
};

export const usePetEmotion = () => {
  const [mood, setMood] = useState<Mood>('idle');
  const [affection, setAffection] = useState<number>(() => {
    const stored = localStorage.getItem('squid-affection');
    return stored ? parseInt(stored) : 0;
  });

  useEffect(() => {
    localStorage.setItem('squid-affection', affection.toString());
  }, [affection]);

  const adjustAffection = (amount: number) => {
    setAffection((prev) => Math.max(0, Math.min(100, prev + amount)));
  };

  const getAnimation = (): AnimationKey => {
    return moodToAnimation[mood] ?? 'idle';
  };

  return {
    mood,
    setMood,
    affection,
    adjustAffection,
    getAnimation,
  };
};
