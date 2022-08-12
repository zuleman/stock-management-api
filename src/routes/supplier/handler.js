const Suppliers = require('./model.js');

// Get All Data
const getAllSupplier = async (req, res) => {
	// const {username, role} = req.payload;
  
	const suppliers = await Suppliers.findAll({
    attributes: ['id', 'name', 'address', 'phone', 'pic']
  });

	res.status(200).send({
		"status": "success",
	    "data": {
	    	"suppliers": suppliers
		}
	});
}

// Get Data by ID
const getSupplierById = async (req, res) => {
  const {id} = req.params;
  const supplier = await Suppliers.findByPk(
    id,
    { attributes: ['id', 'name', 'address', 'phone', 'pic'] }
  );

  if (supplier !== null) {
    res.status(200).send( {
      status: 'success',
      data: {
        supplier,
      },
    });
  } else {
    res.status(404).send( {
      status: 'fail',
      message: 'Supplier is not exist.'
    });
  }

}

//Add New
const addSupplier = async (req, res) => {
  const {name, address, phone, pic} = req.body; 
  const data = {name, address, phone, pic};

  try {
    const supplier = await Suppliers.create(data);

    res.status(200).send( {
        status: 'success',
        data: {
          id: supplier.id
        }
    });
  } catch(error) {
    res.status(500).send( {
        status: 'fail',
        message: getError(error.errors)
    });
  }
}

const updateSupplier = async (req, res) => {
  const {id} = req.params;
  const {name, address, phone, pic} = req.body; 
  const data = {name, address, phone, pic};

  try {
    const supplier = await Suppliers.update( data, { where: {id} });

    if (supplier[0] === 1) {
      res.status(200).send( {
          status: 'success',
          message: 'Supplier data has been updated'
      });
    } else {
      res.status(404).send( {
          status: 'fail',
          message: 'Supplier data failed to update'
      });
    }
  } catch(error) {
    res.status(400).send( {
        status: 'fail',
        message: getError(error.errors)
    });
  }
}

const deleteSupplierById = async (req, res) => {
  const {id} = req.params;
  const supplier = await Suppliers.findByPk(id);

  if (supplier !== null) {
    await Suppliers.destroy({ where: {id} });

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
  getAllSupplier, 
  getSupplierById,
  addSupplier,
  updateSupplier,
  deleteSupplierById
}