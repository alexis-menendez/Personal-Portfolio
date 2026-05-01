// File: client/src/api/dontDie/HNTDLogAPI.ts

// Base URL for all personal log CRUD endpoints
const BASE = '/hntd/api/logs';

// Builds authenticated JSON headers for every protected request
const authHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// Shape of a personal log entry as returned by the API
export interface HNTDLogEntry {
  id: number;
  userId: number;
  title: string;
  content: string;
  commanderName?: string;
  createdAt: string;
  updatedAt: string;
}

// Fetches all logs belonging to the authenticated user
export const fetchLogs = async (token: string): Promise<HNTDLogEntry[]> => {
  const res = await fetch(BASE, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
};

// Creates a new log entry and optionally stamps the commander's name on it
export const createLog = async (token: string, title: string, content: string, commanderName?: string): Promise<HNTDLogEntry> => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title, content, commanderName }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

// Updates the title and content of an existing log entry by ID
export const updateLog = async (token: string, id: number, title: string, content: string): Promise<HNTDLogEntry> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

// Permanently deletes a log entry by ID
export const deleteLog = async (token: string, id: number): Promise<void> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete log');
};
