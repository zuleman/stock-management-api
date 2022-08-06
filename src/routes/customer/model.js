const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConnect = require('../../config/db');
const sequelize = dbConnect();

const Customers = sequelize.define('customers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out this column"},
      notEmpty: { msg: "This column should not be empty"},
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate: {
      notNull: { msg: "Fill out this column" },
      isEmail: { msg: "Please input a valid email" },
    }
  },
}, {
  // tableName: 'customers'
});

// const notDuplicate = value => {
//   throw new Error('This email have been used');
// }

module.exports = Customers;