// File: client/src/api/hntd/authAPI.ts

// Base URL for all HNTD authentication endpoints
const BASE = '/hntd/auth';

// Authenticates an existing explorer and returns user data + JWT token
export const loginHNTD = async (username: string, password: string) => {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

// Registers a new explorer account with a character name and returns user data + JWT token
export const registerHNTD = async (username: string, password: string, characterName: string) => {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, characterName }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

// Updates the explorer's character name after death (new commander flow)
export const renameHNTD = async (token: string, characterName: string) => {
  const res = await fetch(`${BASE}/rename`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ characterName }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};
