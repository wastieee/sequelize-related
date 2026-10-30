const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Единая модель Post для заданий 1 и 5 (publishedAt и status объединены)
const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  publishedAt: { type: DataTypes.DATE, allowNull: false },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft',
  },
});

module.exports = Post;
