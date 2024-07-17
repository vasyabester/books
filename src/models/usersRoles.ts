// src/models/usersRoles.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class UsersRoles extends Model {
  public userId!: number;
  public roleId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

UsersRoles.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UsersRoles',
    timestamps: true,
    paranoid: true,
  }
);

export default UsersRoles;
