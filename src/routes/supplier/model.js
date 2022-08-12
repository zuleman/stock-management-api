const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConnect = require('../../config/db');
const sequelize = dbConnect();

const Suppliers = sequelize.define('suppliers', {
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
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // tableName: 'suppliers'
});

module.exports = Suppliers;