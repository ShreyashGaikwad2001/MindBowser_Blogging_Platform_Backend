

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'posts',
});

// Associate Post with User
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Post, { foreignKey: 'userId' });

module.exports = Post;
