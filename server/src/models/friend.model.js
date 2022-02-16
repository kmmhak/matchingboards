import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './user.model.js';

const Friend = sequelize.define(
  'Friend',
  {
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
    inviteSentAt: {
      type: DataTypes.DATE,
      field: 'invite_sent_at',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'friends',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  },
);

User.belongsToMany(
  User,
  { as: 'sender_id',
    through: Friend,
    foreignKey: 'senderId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  });

User.belongsToMany(
  User,
  { as: 'receiver_id',
    through: Friend,
    foreignKey: 'receiverId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  });

export default Friend;
