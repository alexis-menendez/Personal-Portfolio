// File: client/src/api/taskadelic/authAPI.ts

import { UserLogin } from '../../interfaces/taskadelic/TDUserLogin';

export const login = async (userInfo: UserLogin) => {
  const response = await fetch('/taskadelic/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};
