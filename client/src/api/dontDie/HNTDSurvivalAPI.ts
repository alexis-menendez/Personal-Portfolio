// File: client/src/api/dontDie/HNTDSurvivalAPI.ts

const BASE = '/hntd/api/survival';

const authHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export interface HNTDTip {
  id: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  upvotes: number;
  createdAt: string;
}

export const fetchTips = async (): Promise<HNTDTip[]> => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch tips');
  return res.json();
};

export const createTip = async (token: string, title: string, content: string): Promise<HNTDTip> => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

export const voteTip = async (token: string, id: number): Promise<{ upvotes: number; voted: boolean }> => {
  const res = await fetch(`${BASE}/${id}/vote`, {
    method: 'POST',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Vote failed');
  return res.json();
};

export const deleteTip = async (token: string, id: number): Promise<void> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Delete failed');
};
