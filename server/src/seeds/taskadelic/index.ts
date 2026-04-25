// File: server/src/seeds/taskadelic/index.ts

import { tdSequelize, TDUser, TDTicket } from '../../models/taskadelic/index.js';

export const seedTaskadelic = async () => {
  await tdSequelize.sync({ force: true });

  await TDUser.bulkCreate([
    { username: 'alexis',  password: 'password' },
    { username: 'demo',    password: 'demo1234' },
    { username: 'guest',   password: 'guest123' },
  ], { individualHooks: true });

  await TDTicket.bulkCreate([
    { name: 'Design landing page',        status: 'In Progress', description: 'Create wireframes and mockups.',         assignedUserId: 1 },
    { name: 'Set up project repository',  status: 'Done',        description: 'Initialize GitHub repo with README.',   assignedUserId: 2 },
    { name: 'Implement authentication',   status: 'Todo',        description: 'Set up JWT-based auth.',                assignedUserId: 1 },
    { name: 'Build ticket CRUD API',      status: 'Done',        description: 'REST endpoints for ticket management.', assignedUserId: 3 },
    { name: 'Deploy to production',       status: 'Todo',        description: 'Deploy the app to Render.',             assignedUserId: 2 },
  ]);

  console.log('Taskadelic database seeded.');
  process.exit(0);
};

seedTaskadelic();
