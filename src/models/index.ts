import User from './user';
import Role from './role';

User.belongsToMany(Role, { through: 'UserRoles', as: 'roles', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'UserRoles', as: 'users', foreignKey: 'roleId' });

export { User, Role };
