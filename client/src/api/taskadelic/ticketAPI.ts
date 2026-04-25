// File: client/src/api/taskadelic/ticketAPI.ts

import { TicketData } from '../../interfaces/taskadelic/TicketData';
import { ApiMessage } from '../../interfaces/taskadelic/ApiMessage';
import Auth from '../../utils/taskadelic/auth';

const BASE = '/taskadelic/api/tickets';
const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Auth.getToken()}`,
});

export const retrieveTickets = async (): Promise<TicketData[]> => {
  const res = await fetch(BASE, { headers: headers() });
  if (!res.ok) throw new Error('Failed to retrieve tickets');
  return res.json();
};

export const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  const res = await fetch(`${BASE}/${id}`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to retrieve ticket');
  return res.json();
};

export const createTicket = async (body: TicketData): Promise<TicketData> => {
  const res = await fetch(BASE, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error('Failed to create ticket');
  return res.json();
};

export const updateTicket = async (id: number, body: TicketData): Promise<TicketData> => {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error('Failed to update ticket');
  return res.json();
};

export const deleteTicket = async (id: number): Promise<ApiMessage> => {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE', headers: headers() });
  if (!res.ok) throw new Error('Failed to delete ticket');
  return res.json();
};
