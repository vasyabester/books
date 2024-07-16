import User from './user';
import Role from './role';
import UsersRoles from './usersRoles';
import sequelize from '../config/database';

// Определение ассоциаций
User.belongsToMany(Role, { through: UsersRoles, as: 'roles', foreignKey: 'userId' });
Role.belongsToMany(User, { through: UsersRoles, as: 'users', foreignKey: 'roleId' });

const db = {
  User,
  Role,
  UsersRoles,
  sequelize,
};

export default db;
