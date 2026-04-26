// File: client/src/api/hntd/authAPI.ts

const BASE = '/hntd/auth';

export const loginHNTD = async (username: string, password: string) => {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

export const registerHNTD = async (username: string, password: string) => {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

export const renameHNTD = async (token: string, newUsername: string) => {
  const res = await fetch(`${BASE}/rename`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ newUsername }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};
