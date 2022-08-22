const Orders = require('./model.js');

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
    res.status(200).send( {
      status: 'success',
      data: {
        order,
      },
    });
  } else {
    res.status(404).send( {
      status: 'fail',
      message: 'Order is not exist.'
    });
  }
}

//Add New
const addOrder = async (req, res) => {
  const {customerId, orderDate, amount} = req.body; 
  const data = {customerId, orderDate, amount};

  try {
    const order = await Orders.create(data);

    res.status(200).send( {
        status: 'success',
        data: {
          id: order.id
        }
    });
  } catch(error) {
    res.status(500).send( {
        status: 'fail',
        message: getError(error.errors)
    });
  }
}

const updateOrder = async (req, res) => {
  const {id} = req.params;
  const {customerId, orderDate, amount} = req.body; 
  const data = {customerId, orderDate, amount};

  try {
    const order = await Orders.update( data, { where: {id} });

    if (order[0] === 1) {
      res.status(200).send( {
          status: 'success',
          message: 'Order data has been updated'
      });
    } else {
      res.status(404).send( {
          status: 'fail',
          message: 'Order data failed to update'
      });
    }
  } catch(error) {
    res.status(400).send( {
        status: 'fail',
        message: getError(error.errors)
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
function getError(errors) {
  const initValue = {};
  return errors.reduce(function(result, error) {
        result[error['path']] = error['message'];
        return result;
      }, initValue);
}

module.exports = { 
  getAllOrder, 
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrderById
}