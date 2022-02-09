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
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      field: 'username',
      allowNull: false,
      unique: true,
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
    zipCode: {
      type: DataTypes.INTEGER,
      field: 'zip_code',
    },
    latitude: {
      type: DataTypes.DECIMAL,
    },
    longitude: {
      type: DataTypes.DECIMAL,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: null,
    },
  },
  {
    tableName: 'users',
  },
);

export default User;
