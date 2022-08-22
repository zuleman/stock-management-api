const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConnect = require('../../config/db');
const sequelize = dbConnect();

const Orders = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out this column"},
      notEmpty: { msg: "This column should not be empty"},
    }
  },
  orderDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out this column" },
      notEmpty: { msg: "This column should not be empty"},
    }
  },
  amount: {
    type: DataTypes.DECIMAL(9,2),
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out this column" },
      notEmpty: { msg: "This column should not be empty"},
    }
  },
});

module.exports = Orders;