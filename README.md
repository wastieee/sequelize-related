# Фильтрация и сортировка связанных данных (Sequelize + SQLite)

Пять запросов с вложенным `where`, `required` и многоуровневым `order`.

## Запуск

Требуется Node.js 18+.

```bash
npm install
npm start
```

Скрипт пересоздаёт базу `database.sqlite`, заполняет её тестовыми данными и последовательно выводит результаты всех заданий.

## Структура

- `database.js` — подключение к SQLite
- `models/` — модели User, Post, Author, Book, Student, Course, Enrollment, Order, Item и ассоциации (`models/index.js`)
- `queries.js` — пять функций (задания 1–5), у каждой комментарий о роли `where`, `required` и `order`
- `seed.js` — тестовые данные
- `index.js` — синхронизация, наполнение, вызов функций и вывод

## Задания

| № | Функция | Суть |
|---|---------|------|
| 1 | `getUsersWithRecentPosts` | пользователи с постами после 2023-01-01; `include.where` + `required: true` |
| 2 | `getAllAuthorsIncludingEmpty` | все авторы, в т.ч. без книг; `required: false` (LEFT JOIN) |
| 3 | `getStudentsInAdvancedCourses` | N:M, курсы с `credits > 3`; `through: { attributes: [] }` |
| 4 | `getOrdersWithBulkItems` | заказы с товарами `quantity > 2`; сортировка на двух уровнях |
| 5 | `getActiveUsersWithPublishedPosts` | `where` родителя + `where` связанной модели |

## Примечание

В заданиях 1 и 5 модели User и Post описаны с разными полями, поэтому в проекте они объединены: `User` (name, email, isActive), `Post` (title, publishedAt, status).

## Тестовые данные

- Пользователи: Anna, Boris, Clara (без постов), Denis (неактивен).
- Авторы: Толстой (2 книги), Оруэлл (1 книга), Иванов (без книг).
- Студенты: Иван (курсы на 5, 4 и 2 кредита), Мария (только курс на 2 кредита).
- Заказы: ORD-001, ORD-002 и ORD-003 (без товаров с `quantity > 2`).
