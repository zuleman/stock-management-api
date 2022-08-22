const express = require('express');
const router = express.Router();
const { 
	getAllOrder, 
	getOrderById,
	addOrder,
	updateOrder,
	deleteOrderById
} = require('./handler.js');

// // VERIFY TOKEN
// const auth = require("../../middleware/auth");
// router.all('/*', auth);

//DISPLAY ALL
router.get('/', getAllOrder);

// SHOW DETAIL
router.get('/:id', getOrderById);

// ADD NEW 
router.post('/', addOrder);

// UPDATE
router.put('/:id', updateOrder);

// DELETE
router.delete('/:id', deleteOrderById);

module.exports = router;