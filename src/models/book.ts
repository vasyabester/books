import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  publicationDate: Date;
  genres: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public publicationDate!: Date;
  public genres!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'books',
  }
);

export default Book;
