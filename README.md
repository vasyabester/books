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

## Миграции
Для выполнения миграций используйте команду:
```plaintext
   npx sequelize-cli db:migrate
```

## Переменные окружения

Создайте файл `.env` в корне проекта и добавьте следующие переменные:

```plaintext
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
### Аутентификация пользователя
`POST /users/login`

Тело запроса:

```json
{
  "username": "exampleuser",
  "password": "examplepassword"
}

```
Response:
```json
{
  "token": "your_jwt_token"
}
```
### Получение текущего пользователя

`GET /users/me`

Заголовок:

```plaintext
{
   Authorization: Bearer your_jwt_token
}

```
Response:
```json
{
  "id": 1,
  "username": "exampleuser",
  "email": "user@example.com",
  "roleId": 1
}
```

### Изменение роли пользователя

`PATCH /users/:userId/role`

Заголовок:

```json
{
   Authorization: Bearer your_jwt_token
}

```
Тело запроса:

```json
{
  "roleId": 2
}
```

Response:
```json
{
  "id": 1,
  "username": "exampleuser",
  "email": "user@example.com",
  "roleId": 1
}
```

### Добавление книги

`POST /books`

Заголовок:

```json
{
   Authorization: Bearer your_jwt_token
}

```
Тело запроса:

```json
{
  "title": "New Book",
  "author": "Author Name",
  "publicationDate": "2023-01-01",
  "genres": "Fiction"
}
```

Response:
```json
{
  "message": "Book added successfully",
  "book": {
    "id": 1,
    "title": "New Book",
    "author": "Author Name",
    "publicationDate": "2023-01-01",
    "genres": "Fiction"
  }
}
```


### Получение всех книг

`GET /books`

Тело запроса:

```json
{
  "title": "New Book",
  "author": "Author Name",
  "publicationDate": "2023-01-01",
  "genres": "Fiction"
}
```

Response:
```json
[
  {
    "id": 1,
    "title": "New Book",
    "author": "Author Name",
    "publicationDate": "2023-01-01",
    "genres": "Fiction"
  }
]
```
### Получение книги по ID

`GET /books`

Заголовок:

```json
{
   Authorization: Bearer your_jwt_token
}

```
Response:
```json
{
  "id": 1,
  "title": "New Book",
  "author": "Author Name",
  "publicationDate": "2023-01-01",
  "genres": "Fiction"
}

```

### Обновление книги

`PUT /books`

Заголовок:

```json
{
   Authorization: Bearer your_jwt_token
}

```
Тело запроса:

```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "publicationDate": "2023-01-01",
  "genres": "Updated Genres"
}
```

Response:
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": 1,
    "title": "Updated Book Title",
    "author": "Updated Author",
    "publicationDate": "2023-01-01",
    "genres": "Updated Genres"
  }
}
```

### Удаление книги

`DELETE /books`

Заголовок:

```json
{
   Authorization: Bearer your_jwt_token
}

```
Response:
```json
{
  "message": "Book deleted successfully"
}
```
