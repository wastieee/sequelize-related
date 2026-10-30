const { sequelize } = require('./models');
const seed = require('./seed');
const queries = require('./queries');

function show(title, data) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
}

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await seed();

    show('Задание 1: пользователи с постами после 2023-01-01', await queries.getUsersWithRecentPosts());
    show('Задание 2: все авторы, включая без книг', await queries.getAllAuthorsIncludingEmpty());
    show('Задание 3: студенты на курсах с credits > 3', await queries.getStudentsInAdvancedCourses());
    show('Задание 4: заказы с товарами quantity > 2', await queries.getOrdersWithBulkItems());
    show('Задание 5: активные пользователи с опубликованными постами', await queries.getActiveUsersWithPublishedPosts());
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
  }
}

main();
