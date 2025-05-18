import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Initialize the database and create tables
// Use force: true only in test environment
const forceSync = process.env.NODE_ENV === 'test';
sequelize.sync({ force: forceSync });

export default Task; 