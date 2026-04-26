// File: server/src/models/dontDie/HNTDLog.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface HNTDLogAttributes {
  id: number;
  userId: number;
  title: string;
  content: string;
  commanderName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HNTDLogCreationAttributes extends Optional<HNTDLogAttributes, 'id'> {}

export class HNTDLog extends Model<HNTDLogAttributes, HNTDLogCreationAttributes> implements HNTDLogAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public content!: string;
  public commanderName?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function HNTDLogFactory(sequelize: Sequelize): typeof HNTDLog {
  HNTDLog.init(
    {
      id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId:        { type: DataTypes.INTEGER, allowNull: false },
      title:         { type: DataTypes.STRING,  allowNull: false },
      content:       { type: DataTypes.TEXT,    allowNull: false },
      commanderName: { type: DataTypes.STRING,  allowNull: true  },
    },
    { tableName: 'hntd_logs', sequelize, timestamps: true }
  );
  return HNTDLog;
}
