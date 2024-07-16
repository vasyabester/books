import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UsersRoles extends Model {}

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
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UsersRoles',
    paranoid: true, // This enables the "soft delete" functionality
  }
);

export default UsersRoles;
