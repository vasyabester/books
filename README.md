# Book API

## Описание

Book API — это RESTful API для управления коллекцией книг, реализованное на Node.js с использованием Express и PostgreSQL (Sequelize ORM). Поддерживает регистрацию, аутентификацию пользователей и CRUD операции для книг.

## Установка

1. Клонируйте репозиторий на ваш локальный компьютер:
    ```bash
    git clone https://github.com/vasyabester/books.git
    cd books
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

## Запуск

1. Убедитесь, что PostgreSQL сервер запущен и настроен правильно.

2. Запустите приложение:
    ```bash
    npm run dev
    ```

Приложение будет запущено на `http://localhost:3000`.

## Конфигурационный файл

Конфигурационный файл находится в `config/config.json`. Пример конфигурации:

```json
{
  "development": {
    "username": "postgres",
    "password": "your_password",
    "database": "bookapi",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
