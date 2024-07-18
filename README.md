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
```

## Переменные окружения

Создайте файл `.env` в корне проекта и добавьте следующие переменные:

```json
DB_NAME=bookapi
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=britney.schowalter@ethereal.email
SMTP_PASS=ChZdCrSY3dQuV2CRfT
EMAIL_FROM=your-email@example.com
```

## Эндпоинты

### Регистрация пользователя
`POST /users/register`

Тело запроса:

```json
{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email@example.com"
}
```
Response:
```json
{
  "message": "Registration successful. Please check your email to confirm."
}
```

