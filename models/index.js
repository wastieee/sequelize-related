const sequelize = require('../database');
const User = require('./User');
const Post = require('./Post');
const Author = require('./Author');
const Book = require('./Book');
const Student = require('./Student');
const Course = require('./Course');
const Enrollment = require('./Enrollment');
const Order = require('./Order');
const Item = require('./Item');

// 1:N — пользователь и посты
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// 1:N — автор и книги
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

// N:M — студенты и курсы через Enrollment
Student.belongsToMany(Course, { through: Enrollment, as: 'courses' });
Course.belongsToMany(Student, { through: Enrollment, as: 'students' });

// 1:N — заказ и товары
Order.hasMany(Item, { foreignKey: 'orderId', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

module.exports = {
  sequelize,
  User,
  Post,
  Author,
  Book,
  Student,
  Course,
  Enrollment,
  Order,
  Item,
};
