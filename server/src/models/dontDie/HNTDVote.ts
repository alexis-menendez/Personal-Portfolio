// File: server/src/models/dontDie/HNTDVote.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface HNTDVoteAttributes {
  id: number;
  tipId: number;
  userId: number;
}

interface HNTDVoteCreationAttributes extends Optional<HNTDVoteAttributes, 'id'> {}

export class HNTDVote
  extends Model<HNTDVoteAttributes, HNTDVoteCreationAttributes>
  implements HNTDVoteAttributes {
  public id!: number;
  public tipId!: number;
  public userId!: number;
}

export function HNTDVoteFactory(sequelize: Sequelize): typeof HNTDVote {
  HNTDVote.init(
    {
      id:     { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      tipId:  { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'hntd_votes', sequelize, timestamps: false }
  );
  return HNTDVote;
}
