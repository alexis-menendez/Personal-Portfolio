// File: server/src/controllers/taskadelic/ticketController.ts

import { Request, Response } from 'express';
import { TDTicket, TDUser } from '../../models/taskadelic/index.js';

export const getAllTickets = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await TDTicket.findAll({ include: [{ model: TDUser, as: 'assignedUser', attributes: ['username'] }] });
    res.json(tickets);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await TDTicket.findByPk(req.params.id, { include: [{ model: TDUser, as: 'assignedUser', attributes: ['username'] }] });
    if (!ticket) { res.status(404).json({ message: 'Ticket not found' }); return; }
    res.json(ticket);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, status, description, assignedUserId } = req.body;
    const ticket = await TDTicket.create({ name, status, description, assignedUserId });
    res.status(201).json(ticket);
  } catch (err: any) { res.status(400).json({ message: err.message }); }
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await TDTicket.findByPk(req.params.id);
    if (!ticket) { res.status(404).json({ message: 'Ticket not found' }); return; }
    const { name, status, description, assignedUserId } = req.body;
    Object.assign(ticket, { name, status, description, assignedUserId });
    await ticket.save();
    res.json(ticket);
  } catch (err: any) { res.status(400).json({ message: err.message }); }
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await TDTicket.findByPk(req.params.id);
    if (!ticket) { res.status(404).json({ message: 'Ticket not found' }); return; }
    await ticket.destroy();
    res.json({ message: 'Ticket deleted' });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};
