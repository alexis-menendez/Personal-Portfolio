// File: server/src/seeds/dontDie/index.ts

import { hntdSequelize, HNTDUser } from '../../models/dontDie/index.js';

const seedHNTD = async () => {
  await hntdSequelize.sync({ force: true });

  await HNTDUser.bulkCreate([
    { username: 'explorer',  password: 'password'  },
    { username: 'commander', password: 'demo1234'  },
    { username: 'vera',      password: 'guest123'  },
  ], { individualHooks: true });

  console.log('HNTD database seeded.');
  process.exit(0);
};

seedHNTD();
