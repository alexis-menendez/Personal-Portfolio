// File: server/src/models/taskadelic/TDUser.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface TDUserAttributes {
  id: number;
  username: string;
  password: string;
}

interface TDUserCreationAttributes extends Optional<TDUserAttributes, 'id'> {}

export class TDUser extends Model<TDUserAttributes, TDUserCreationAttributes> implements TDUserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }
}

export function TDUserFactory(sequelize: Sequelize): typeof TDUser {
  TDUser.init(
    {
      id:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING,  allowNull: false },
      password: { type: DataTypes.STRING,  allowNull: false },
    },
    {
      tableName: 'td_users',
      sequelize,
      hooks: {
        beforeCreate: async (user: TDUser) => { await user.setPassword(user.password); },
        beforeUpdate: async (user: TDUser) => { await user.setPassword(user.password); },
      },
    }
  );
  return TDUser;
}
