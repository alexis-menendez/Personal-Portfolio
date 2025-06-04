// File: server/src/utils/innerOrbit/formatEntry.ts

import { IMoodEntry } from '../models/Tracker.js';

export const formatMoodEntry = (entry: any): IMoodEntry => {
  const obj = entry.toObject();
  return {
    ...obj,
    _id: obj._id.toString(),
  };
};
