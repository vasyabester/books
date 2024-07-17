// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Role from './role';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public roleId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

User.belongsToMany(Role, {
  through: 'UsersRoles',
  as: 'roles',
  foreignKey: 'userId'
});

Role.belongsToMany(User, {
  through: 'UsersRoles',
  as: 'users',
  foreignKey: 'roleId'
});

export default User;
