import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Session = sequelize.define(
  'Session',
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      field: 'game_id',
      references: {
        value: 'games',
        key: 'id',
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      field: 'creator_id',
      references: {
        value: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    sessionFinished: {
      type: DataTypes.BOOLEAN,
      field: 'session_finished',
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'sessions',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);

export default Session;
