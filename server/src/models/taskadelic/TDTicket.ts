// File: server/src/models/taskadelic/TDTicket.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { TDUser } from './TDUser.js';

interface TDTicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
}

interface TDTicketCreationAttributes extends Optional<TDTicketAttributes, 'id'> {}

export class TDTicket extends Model<TDTicketAttributes, TDTicketCreationAttributes> implements TDTicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;
  public readonly assignedUser?: TDUser;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TDTicketFactory(sequelize: Sequelize): typeof TDTicket {
  TDTicket.init(
    {
      id:             { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name:           { type: DataTypes.STRING,  allowNull: false },
      status:         { type: DataTypes.STRING,  allowNull: false },
      description:    { type: DataTypes.STRING,  allowNull: false },
      assignedUserId: { type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'td_tickets', sequelize }
  );
  return TDTicket;
}
