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
      notNull: { msg: "Fill out this column."},
      notEmpty: { msg: "This column should not be empty."},
    }
  },
  orderDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out this column" },
      notEmpty: { msg: "This column should not be empty."},
    }
  },
  amount: {
    type: DataTypes.DECIMAL(9,2),
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out this column" },
      notEmpty: { msg: "This column should not be empty."},
    }
  },
});

const OrderDetails = sequelize.define('orderDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Order ID cannot be null."},
      notEmpty: { msg: "Order ID cannot be empty."},
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out the product."},
      notEmpty: { msg: "Product cannot be empty."},
    }
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out Quantity." },
      notEmpty: { msg: "Quantity cannot be empty."},
    }
  },
  price: {
    type: DataTypes.DECIMAL(9,2),
    allowNull: false,
    validate: {
      notNull: { msg: "Fill out Price" },
      notEmpty: { msg: "Price cannot be empty."},
    }
  },
  subTotal: {
    type: DataTypes.DECIMAL(9,2),
    allowNull: false
  },
});

module.exports = {Orders, OrderDetails, sequelize};