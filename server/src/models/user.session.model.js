import sequelize from '../db/db.js';
import Session from './session.model.js';
import User from './user.model.js';

const UserSession = sequelize.define(
  'UserSession',
  {},
  {
    tableName: 'users_sessions',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  },
);

User.belongsToMany(Session, { through: UserSession, foreignKey: 'user_id' });
Session.belongsToMany(User, { through: UserSession, foreignKey: 'session_id' });

export default UserSession;
