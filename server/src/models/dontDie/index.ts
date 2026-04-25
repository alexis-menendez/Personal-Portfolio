// File: server/src/models/dontDie/index.ts

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { HNTDUserFactory        } from './HNTDUser.js';
import { HNTDLogFactory         } from './HNTDLog.js';
import { HNTDSurvivalTipFactory } from './HNTDSurvivalTip.js';
import { HNTDVoteFactory        } from './HNTDVote.js';

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

const HNTDUser        = HNTDUserFactory(hntdSequelize);
const HNTDLog         = HNTDLogFactory(hntdSequelize);
const HNTDSurvivalTip = HNTDSurvivalTipFactory(hntdSequelize);
const HNTDVote        = HNTDVoteFactory(hntdSequelize);

HNTDUser.hasMany(HNTDLog,         { foreignKey: 'userId' });
HNTDLog.belongsTo(HNTDUser,       { foreignKey: 'userId' });

HNTDSurvivalTip.hasMany(HNTDVote, { foreignKey: 'tipId' });
HNTDVote.belongsTo(HNTDSurvivalTip, { foreignKey: 'tipId' });

export { hntdSequelize, HNTDUser, HNTDLog, HNTDSurvivalTip, HNTDVote };
