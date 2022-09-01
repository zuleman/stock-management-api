const {Orders, OrderDetails, sequelize} = require('./model.js');

//Add New
const addOrder = async (req, res) => {
  const {customerId, orderDate, amount} = req.body; 
  const trans = await sequelize.transaction();

  try {
    // ORDER
    const order = {customerId, orderDate, amount};
    const resultOrder = await Orders.create(order, {transaction: trans} );

    // ORDER DETAILS
    const orderDetails = req.body.orderDetails.map( row => {
      row["orderId"] = resultOrder.id;
      row["subTotal"] = row.qty * row.price;
      return row;
    });

    const resultOrderDetails = await OrderDetails.bulkCreate(orderDetails, {
      transaction: trans,
      validate: true
    });

    await trans.commit();

    res.status(200).send( {
        status: 'success',
        data: {
          detail: resultOrderDetails.length,
          id: resultOrder.id
        }
    });
  } catch(error) {
    await trans.rollback();

    res.status(500).send( {
        status: 'fail',
        // message: error
        message: getError(error)
    });
  }
}

// Get All Data
const getAllOrder = async (req, res) => {
	// const {username, role} = req.payload;
  
	const orders = await Orders.findAll({
    attributes: ['id', 'customerId', 'orderDate', 'amount']
  });

	res.status(200).send({
		"status": "success",
	    "data": {
	    	"orders": orders
		}
	});
}

// Get Data by ID
const getOrderById = async (req, res) => {
  const {id} = req.params;
  const order = await Orders.findByPk(
    id,
    { attributes: ['id', 'customerId', 'orderDate', 'amount'] }
  );

  if (order !== null) {
    const orderDetails = await OrderDetails.findAll({ 
      where: { orderId: id },
      attributes: ['id', 'productId', 'qty', 'price', 'subTotal'] 
    });

    order.dataValues.orderDetails = orderDetails;

    res.status(200).send( {
      status: 'success',
      data: {
        order,
        // orderDetails
      },
    });
  } else {
    res.status(404).send( {
      status: 'fail',
      message: 'Order is not exist.'
    });
  }
}

const updateOrder = async (req, res) => {
  const id = parseInt(req.params.id);  
  const trans = await sequelize.transaction();

  try {
    // ORDER DETAILS
    const orderDetailsData = req.body.orderDetails;
    const orderAmount = await updateOrderDetails(orderDetailsData, id, trans);

    // ORDER
    const {customerId, orderDate} = req.body;
    const dataOrder = {customerId, orderDate, amount: orderAmount};
    const order = await Orders.update( dataOrder, { 
      where: {id}, 
      transaction: trans 
    });

    if (order[0] === 0) {
      throw {
        name: 'GeneralError',
        message: 'Order: Nothing to update.'
      };
    }
    await trans.commit();
    
    res.status(200).send( {
        status: 'success',
        message: 'Order data has been updated'
    });
  } catch(error) {
    await trans.rollback();
    res.status(400).send( {
        status: 'fail',
        message: getError(error)
    });
  }
}

const deleteOrderById = async (req, res) => {
  const {id} = req.params;
  const trans = await sequelize.transaction();

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      throw {
        name: 'GeneralError',
        message: 'Data gagal dihapus, ID tidak ditemukan'
      }
    }
    
    //--------------- ORDER DETAILS----------------------
    // find details if exists
    const orderDetails = await OrderDetails.findOne({ 
      where: { orderId: id },
      attributes: ['id'] 
    });

    // delete details
    if (orderDetails) {
      let deleteResult = await OrderDetails.destroy({ 
        where: {orderId: id},
        transaction: trans
      });

      if (!deleteResult) {
        throw {
          name: 'GeneralError',
          message: 'Data detail gagal dihapus.'
        }
      }
    }

    //--------------- END OF ORDER DETAILS----------------------

    deleteResult = await Orders.destroy({ 
      where: {id},
      transaction: trans
    });

    await trans.commit();

    res.status(200).send( {
        status: 'success',
        message: 'Data berhasil dihapus'
    });
    
  } catch(error) {
    await trans.rollback();
    res.status(400).send( {
        status: 'fail',
        message: getError(error)
    });
  }
}

const updateOrderDetails = async (data, orderId, trans=null) => {
  const orderDetails = await OrderDetails.findAll({ 
    where: { orderId },
    attributes: ['id', 'productId', 'qty', 'price', 'subTotal'] 
  });

  let orderAmount = 0;
  let orderDetailsData = data.map( datum => {
    datum.orderId = orderId;
    datum.subTotal = datum.qty * datum.price;
    orderAmount += datum.subTotal;

    return datum;
  });

  let updateResult;
  for (const orderDetail of orderDetails) {
    const index = orderDetailsData.findIndex( orderDetailData => orderDetailData.id === orderDetail.id );

    if (index !== -1 )  {
      //update
      updateResult = await OrderDetails.update(orderDetailsData[index], { 
        where: {id: orderDetailsData[index].id}, 
        transaction: trans 
      });

      if (updateResult[0] === 0) {
        throw {
          name: 'GeneralError',
          message: 'Order Details: Nothing to update.'
        };
      }

      //hapus index
      orderDetailsData.splice(index,1);
    } else {
      //delete
      await OrderDetails.destroy({ 
        where: {id: orderDetail.id},
        transaction: trans 
      });
    }
  };

  if (orderDetailsData.length > 0) {
    //insert
    await OrderDetails.bulkCreate(orderDetailsData, {
      transaction: trans,
      validate: true
    });
  }

  return orderAmount;
}

//additional library
function getError(error) {
  const initValue = {};  
  let errors;
  switch(error.name) {
    case "SequelizeValidationError":
      errors = error.errors.reduce(function(result, error) {
        result[error['path']] = error['message'];
        return result;
      }, initValue);

      break;
    case "AggregateError":
      errors = error;
      break;
    default:
      errors = error;
  } 

  return errors;
}

module.exports = { 
  getAllOrder, 
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrderById
}