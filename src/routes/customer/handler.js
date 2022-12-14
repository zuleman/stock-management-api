const Customers = require('./model.js');

// Get All Data
const getAllCustomer = async (req, res) => {
	// const {username, role} = req.payload;
  
	const customers = await Customers.findAll({
    attributes: ['id', 'name', 'email']
  });

	res.status(200).send({
		"status": "success",
	    "data": {
	    	"customers": customers
		}
	});
}

// Get Data by ID
const getCustomerById = async (req, res) => {
  const {id} = req.params;
  const customer = await Customers.findByPk(
    id,
    { attributes: ['id', 'name', 'email'] }
  );

  if (customer !== null) {
    res.status(200).send( {
      status: 'success',
      data: {
        customer,
      },
    });
  } else {
    res.status(404).send( {
      status: 'fail',
      message: 'Customer is not exist.'
    });
  }
}

//Add New
const addCustomer = async (req, res) => {
  const {name, email} = req.body; 
  const data = {name, email};

  try {
    const customer = await Customers.create(data);

    res.status(200).send( {
        status: 'success',
        data: {
          id: customer.id
        }
    });
  } catch(error) {
    res.status(500).send( {
        status: 'fail',
        message: getError(error.errors)
    });
  }
}

const updateCustomer = async (req, res) => {
  const {id} = req.params;
  const {name, email} = req.body; 
  const data = {name, email};

  try {
    const customer = await Customers.update( data, { where: {id} });

    if (customer[0] === 1) {
      res.status(200).send( {
          status: 'success',
          message: 'Customer data has been updated'
      });
    } else {
      res.status(404).send( {
          status: 'fail',
          message: 'Customer data failed to update'
      });
    }
  } catch(error) {
    res.status(400).send( {
        status: 'fail',
        message: getError(error.errors)
    });
  }
}

const deleteCustomerById = async (req, res) => {
  const {id} = req.params;
  const customer = await Customers.findByPk(id);

  if (customer !== null) {
    await Customers.destroy({ where: {id} });

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
  getAllCustomer, 
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomerById
}