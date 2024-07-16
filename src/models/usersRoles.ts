// src/models/usersRoles.ts
import { DataTypes, Model } from 'sequelize';
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
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    paranoid: true,
  }
);

export default UsersRoles;
