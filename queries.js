const { Op } = require('sequelize');
const { User, Post, Author, Book, Student, Course, Order, Item } = require('./models');

/**
 * Задание 1. Пользователи, у которых есть пост с publishedAt > 2023-01-01.
 * - where внутри include: условие относится к Post, попадает в ON-часть JOIN.
 * - required: true: INNER JOIN, пользователи без подходящих постов отсеиваются.
 * - order: пользователи по имени (ASC), их посты по publishedAt (DESC).
 */
async function getUsersWithRecentPosts() {
  return User.findAll({
    include: [
      {
        model: Post,
        as: 'posts',
        where: { publishedAt: { [Op.gt]: '2023-01-01' } },
        required: true,
      },
    ],
    order: [
      ['name', 'ASC'],
      [{ model: Post, as: 'posts' }, 'publishedAt', 'DESC'],
    ],
  });
}

/**
 * Задание 2. Все авторы, включая тех, у кого нет книг.
 * - where не нужен: фильтровать связанную таблицу не требуется.
 * - required: false: LEFT OUTER JOIN, авторы без книг сохраняются (books = []).
 * - order: по фамилии (ASC).
 */
async function getAllAuthorsIncludingEmpty() {
  return Author.findAll({
    include: [
      {
        model: Book,
        as: 'books',
        required: false,
      },
    ],
    order: [['lastName', 'ASC']],
  });
}

/**
 * Задание 3. Студенты, записанные хотя бы на один курс с credits > 3 (N:M).
 * - where внутри include: фильтр по полю Course.
 * - required: true: студенты без подходящих курсов отсеиваются.
 * - through: { attributes: [] }: поля Enrollment не выводятся.
 * - order: студенты по имени, курсы по названию (оба ASC).
 */
async function getStudentsInAdvancedCourses() {
  return Student.findAll({
    include: [
      {
        model: Course,
        as: 'courses',
        where: { credits: { [Op.gt]: 3 } },
        required: true,
        through: { attributes: [] },
      },
    ],
    order: [
      ['name', 'ASC'],
      [{ model: Course, as: 'courses' }, 'title', 'ASC'],
    ],
  });
}

/**
 * Задание 4. Заказы, содержащие хотя бы один товар с quantity > 2.
 * - where внутри include: фильтр по Item; в результат попадают только такие товары.
 * - required: true: заказы без подходящих товаров отсеиваются.
 * - order: заказы по createdAt (DESC), товары внутри заказа по price (DESC).
 */
async function getOrdersWithBulkItems() {
  return Order.findAll({
    include: [
      {
        model: Item,
        as: 'items',
        where: { quantity: { [Op.gt]: 2 } },
        required: true,
      },
    ],
    order: [
      ['createdAt', 'DESC'],
      [{ model: Item, as: 'items' }, 'price', 'DESC'],
    ],
  });
}

/**
 * Задание 5. Активные пользователи, у которых есть опубликованный пост.
 * - where верхнего уровня: фильтр по полю User (isActive).
 * - where внутри include: фильтр по полю Post (status).
 * - required: true: пользователи без опубликованных постов отсеиваются.
 * - order: пользователи по имени (ASC), посты по createdAt (DESC).
 */
async function getActiveUsersWithPublishedPosts() {
  return User.findAll({
    where: { isActive: true },
    include: [
      {
        model: Post,
        as: 'posts',
        where: { status: 'published' },
        required: true,
      },
    ],
    order: [
      ['name', 'ASC'],
      [{ model: Post, as: 'posts' }, 'createdAt', 'DESC'],
    ],
  });
}

module.exports = {
  getUsersWithRecentPosts,
  getAllAuthorsIncludingEmpty,
  getStudentsInAdvancedCourses,
  getOrdersWithBulkItems,
  getActiveUsersWithPublishedPosts,
};
