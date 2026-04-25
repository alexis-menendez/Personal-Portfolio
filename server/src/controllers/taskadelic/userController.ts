// File: server/src/controllers/taskadelic/userController.ts

import { Request, Response } from 'express';
import { TDUser } from '../../models/taskadelic/index.js';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await TDUser.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await TDUser.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    res.json(user);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await TDUser.create(req.body);
    res.status(201).json(user);
  } catch (err: any) { res.status(400).json({ message: err.message }); }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await TDUser.findByPk(req.params.id);
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};
