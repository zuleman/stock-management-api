const {Orders, OrderDetails, sequelize} = require('./model.js');

//Add New
const addOrder = async (req, res) => {
  const {customerId, orderDate, amount} = req.body; 
  const trans = await sequelize.transaction();

  try {
    //orders
    const order = {customerId, orderDate, amount};
    const resultOrder = await Orders.create(order, {transaction: trans} );

    //orderDetails
    const orderDetails = req.body.orderDetails.map( row => {
      row["orderId"] = resultOrder.id;
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
  const {customerId, orderDate, amount} = req.body; 
  const trans = await sequelize.transaction();

  try {
    const dataOrder = {customerId, orderDate, amount};
    const order = await Orders.update( dataOrder, { 
      where: {id}, 
      transaction: trans 
    });

    //ganti jadi if order[0] === 0 { throw error }
    if (order[0] === 1) {
      const orderDetails = await OrderDetails.findAll({ 
        where: { orderId: id },
        attributes: ['id', 'productId', 'qty', 'price', 'subTotal'] 
      });

      const details = req.body.orderDetails;
      let dataOrderDetails = details.map( detail => {
        detail.orderId = id;
        detail.subTotal = detail.qty * detail.price;
        return detail;
      });

      // update orders.amount

      let updateResult;
      for (const orderDetail of orderDetails) {
        const index = dataOrderDetails.findIndex( dataOrderDetail => dataOrderDetail.id === orderDetail.id );

        if (index !== -1 )  {
          //update
          updateResult = await OrderDetails.update(dataOrderDetails[index], { 
            where: {id: dataOrderDetails[index].id}, 
            transaction: trans 
          });

          //hapus index
          dataOrderDetails.splice(index,1);

          // if (updateResult[0] === 0) {
          //   throw {
          //     name: 'OthersError',
          //     message: 'Nothing to update.'
          //   };
          // }
        } else {
          //delete
          await OrderDetails.destroy({ 
            where: {id: orderDetail.id},
            transaction: trans 
          });
        }
      };

      // console.log('data akhir:',dataOrderDetails);  ///////////

      if (dataOrderDetails.length > 0) {
        //insert
        await OrderDetails.bulkCreate(dataOrderDetails, {
          transaction: trans,
          validate: true
        });
      }

      await trans.commit();
      // await trans.rollback();

      res.status(200).send( {
          status: 'success',
          message: 'Order data has been updated'
      });
    } else {
      throw {
        name: 'OthersError',
        message: 'Nothing to update.'
      };

      // res.status(404).send( {
      //     status: 'fail',
      //     message: 'Order data failed to update'
      // });
    }
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
  const order = await Orders.findByPk(id);

  if (order !== null) {
    await Orders.destroy({ where: {id} });

    res.status(200).send( {
        status: 'success',
        message: 'Data berhasil dihapus'
    });
  } else {
    res.status(404).send( {
        status: 'fail',
        messsage: 'Data gagal dihapus, ID tidak ditemukan'
    });
  }
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