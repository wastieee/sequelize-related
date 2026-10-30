const { User, Post, Author, Book, Student, Course, Order, Item } = require('./models');

// Тестовые данные для всех пяти заданий
async function seed() {
  // Пользователи: Clara без постов, Denis неактивен
  const anna = await User.create({ name: 'Anna', email: 'anna@example.com' });
  const boris = await User.create({ name: 'Boris', email: 'boris@example.com' });
  await User.create({ name: 'Clara', email: 'clara@example.com' });
  const denis = await User.create({ name: 'Denis', email: 'denis@example.com', isActive: false });

  await Post.bulkCreate([
    { title: 'Старый пост Anna', publishedAt: '2022-05-10', status: 'published', authorId: anna.id },
    { title: 'Новости 2023', publishedAt: '2023-03-15', status: 'published', authorId: anna.id },
    { title: 'Черновик Anna', publishedAt: '2024-01-20', status: 'draft', authorId: anna.id },
    { title: 'Заметки Boris', publishedAt: '2022-11-01', status: 'published', authorId: boris.id },
    { title: 'Статья Denis', publishedAt: '2023-06-01', status: 'published', authorId: denis.id },
  ]);

  // Авторы: у Иванова нет книг
  const tolstoy = await Author.create({ firstName: 'Лев', lastName: 'Толстой', country: 'Россия' });
  const orwell = await Author.create({ firstName: 'Джордж', lastName: 'Оруэлл', country: 'Великобритания' });
  await Author.create({ firstName: 'Пётр', lastName: 'Иванов', country: 'Россия' });

  await Book.bulkCreate([
    { title: 'Война и мир', year: 1869, genre: 'роман', authorId: tolstoy.id },
    { title: 'Анна Каренина', year: 1877, genre: 'роман', authorId: tolstoy.id },
    { title: '1984', year: 1949, genre: 'антиутопия', authorId: orwell.id },
  ]);

  // Студенты и курсы разной «кредитности»
  const ivan = await Student.create({ name: 'Иван', group: 'ИС-21' });
  const maria = await Student.create({ name: 'Мария', group: 'ИС-22' });
  const db = await Course.create({ title: 'Базы данных', credits: 5 });
  const algo = await Course.create({ title: 'Алгоритмы', credits: 4 });
  const pe = await Course.create({ title: 'Физкультура', credits: 2 });

  await ivan.addCourses([db, algo, pe]);
  await maria.addCourses([pe]);

  // Заказы: у ORD-003 нет товаров с quantity > 2
  const o1 = await Order.create({ number: 'ORD-001', status: 'paid', createdAt: '2024-02-01' });
  const o2 = await Order.create({ number: 'ORD-002', status: 'new', createdAt: '2024-03-01' });
  const o3 = await Order.create({ number: 'ORD-003', status: 'shipped', createdAt: '2024-04-01' });

  await Item.bulkCreate([
    { productName: 'Ручка', quantity: 5, price: 30, orderId: o1.id },
    { productName: 'Тетрадь', quantity: 10, price: 15.5, orderId: o1.id },
    { productName: 'Папка', quantity: 1, price: 120, orderId: o1.id },
    { productName: 'Монитор', quantity: 1, price: 15000, orderId: o2.id },
    { productName: 'Кабель', quantity: 3, price: 300, orderId: o2.id },
    { productName: 'Мышь', quantity: 1, price: 900, orderId: o3.id },
  ]);
}

module.exports = seed;
