import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes'; // Импортируйте маршруты пользователей
import sequelize from './config/database';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes); // Зарегистрируйте маршруты пользователей

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
