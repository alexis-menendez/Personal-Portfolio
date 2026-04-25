// File: server/src/models/dontDie/HNTDSurvivalTip.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface HNTDSurvivalTipAttributes {
  id: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  upvotes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HNTDSurvivalTipCreationAttributes
  extends Optional<HNTDSurvivalTipAttributes, 'id' | 'upvotes'> {}

export class HNTDSurvivalTip
  extends Model<HNTDSurvivalTipAttributes, HNTDSurvivalTipCreationAttributes>
  implements HNTDSurvivalTipAttributes {
  public id!: number;
  public userId!: number;
  public username!: string;
  public title!: string;
  public content!: string;
  public upvotes!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function HNTDSurvivalTipFactory(sequelize: Sequelize): typeof HNTDSurvivalTip {
  HNTDSurvivalTip.init(
    {
      id:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId:   { type: DataTypes.INTEGER, allowNull: false },
      username: { type: DataTypes.STRING,  allowNull: false },
      title:    { type: DataTypes.STRING,  allowNull: false },
      content:  { type: DataTypes.TEXT,    allowNull: false },
      upvotes:  { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    { tableName: 'hntd_survival_tips', sequelize, timestamps: true }
  );
  return HNTDSurvivalTip;
}
