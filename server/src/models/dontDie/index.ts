// File: server/src/models/dontDie/index.ts

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { HNTDUserFactory } from './HNTDUser.js';

// Reuse the same Neon DB as Taskadelic — tables are prefixed hntd_*
const hntdSequelize = process.env.TD_DB_URL
  ? new Sequelize(process.env.TD_DB_URL, {
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
      logging: false,
    })
  : new Sequelize(
      process.env.TD_DB_NAME || 'portfolio',
      process.env.TD_DB_USER || 'postgres',
      process.env.TD_DB_PASSWORD || '',
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: { decimalNumbers: true },
        logging: false,
      }
    );

const HNTDUser = HNTDUserFactory(hntdSequelize);

export { hntdSequelize, HNTDUser };
