// File: server/src/models/taskadelic/index.ts

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { TDUserFactory } from './TDUser.js';
import { TDTicketFactory } from './TDTicket.js';

const tdSequelize = process.env.TD_DB_URL
  ? new Sequelize(process.env.TD_DB_URL, {
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
      logging: false,
    })
  : new Sequelize(
      process.env.TD_DB_NAME || 'taskadelic_db',
      process.env.TD_DB_USER || 'postgres',
      process.env.TD_DB_PASSWORD || '',
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: { decimalNumbers: true },
        logging: false,
      }
    );

const TDUser   = TDUserFactory(tdSequelize);
const TDTicket = TDTicketFactory(tdSequelize);

TDUser.hasMany(TDTicket,   { foreignKey: 'assignedUserId' });
TDTicket.belongsTo(TDUser, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { tdSequelize, TDUser, TDTicket };
