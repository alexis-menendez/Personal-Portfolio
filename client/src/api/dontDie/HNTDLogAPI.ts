// File: client/src/api/dontDie/HNTDLogAPI.ts

const BASE = '/hntd/api/logs';

const authHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export interface HNTDLogEntry {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchLogs = async (token: string): Promise<HNTDLogEntry[]> => {
  const res = await fetch(BASE, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
};

export const createLog = async (token: string, title: string, content: string): Promise<HNTDLogEntry> => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

export const updateLog = async (token: string, id: number, title: string, content: string): Promise<HNTDLogEntry> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

export const deleteLog = async (token: string, id: number): Promise<void> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete log');
};
