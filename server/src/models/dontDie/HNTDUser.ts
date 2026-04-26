// File: server/src/models/hntd/HNTDUser.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface HNTDUserAttributes { id: number; username: string; password: string; characterName?: string; }
interface HNTDUserCreationAttributes extends Optional<HNTDUserAttributes, 'id'> {}

export class HNTDUser extends Model<HNTDUserAttributes, HNTDUserCreationAttributes> implements HNTDUserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public characterName?: string;

  public async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }
}

export function HNTDUserFactory(sequelize: Sequelize): typeof HNTDUser {
  HNTDUser.init(
    {
      id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username:      { type: DataTypes.STRING,  allowNull: false, unique: true },
      password:      { type: DataTypes.STRING,  allowNull: false },
      characterName: { type: DataTypes.STRING,  allowNull: true  },
    },
    {
      tableName: 'hntd_users',
      sequelize,
      timestamps: false,
      hooks: {
        beforeCreate: async (user: HNTDUser) => { await user.setPassword(user.password); },
        beforeUpdate: async (user: HNTDUser) => {
          if (user.changed('password')) await user.setPassword(user.password);
        },
      },
    }
  );
  return HNTDUser;
}
