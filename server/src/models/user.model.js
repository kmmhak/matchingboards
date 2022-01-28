import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      field: 'username',
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('regular', 'admin', 'eventOrganizer'),
      defaultValue: 'regular',
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
  },
);

export default User;
