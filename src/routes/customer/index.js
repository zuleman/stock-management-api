const express = require('express');
const router = express.Router();
const { 
	getAllCustomer, 
	getCustomerById,
	addCustomer,
	updateCustomer,
	deleteCustomerById
} = require('./handler.js');

// // VERIFY TOKEN
// const auth = require("../../middleware/auth");
// router.all('/*', auth);

//DISPLAY ALL
router.get('/', getAllCustomer);

// SHOW DETAIL
router.get('/:id', getCustomerById);

// ADD NEW 
router.post('/', addCustomer);

// UPDATE
router.put('/:id', updateCustomer);

// DELETE
router.delete('/:id', deleteCustomerById);

module.exports = router;