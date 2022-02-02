import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Game = sequelize.define(
  'Game',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      field: 'release_year',
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minPlayers: {
      type: DataTypes.INTEGER,
      field: 'min_players',
      allowNull: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      field: 'max_players',
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url',
    },
  },
  {
    tableName: 'games',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);

export default Game;
