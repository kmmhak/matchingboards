import sequelize from '../db/db.js';
import Game from './game.model.js';
import User from './user.model.js';

const UserGame = sequelize.define(
  'UserGame',
  {},
  {
    tableName: 'users_games',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  },
);

User.belongsToMany(Game, { through: UserGame, foreignKey: 'user_id' });
Game.belongsToMany(User, { through: UserGame, foreignKey: 'game_id' });

export default UserGame;
