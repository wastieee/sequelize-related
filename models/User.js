const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Единая модель User для заданий 1 и 5 (поля email и isActive объединены)
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = User;
