// File: client/src/api/taskadelic/userAPI.ts

import Auth from '../../utils/taskadelic/TDAuth';

export const retrieveUsers = async () => {
  const res = await fetch('/taskadelic/api/users', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  });
  if (!res.ok) throw new Error('Failed to retrieve users');
  return res.json();
};
