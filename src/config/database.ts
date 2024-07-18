import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bookapi', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
  port: 5432,
});

export default sequelize;

