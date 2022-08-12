const express = require('express');
const router = express.Router();
const { 
	getAllSupplier, 
	getSupplierById,
	addSupplier,
	updateSupplier,
	deleteSupplierById
} = require('./handler.js');

// // VERIFY TOKEN
// const auth = require("../../middleware/auth");
// router.all('/*', auth);

//DISPLAY ALL
router.get('/', getAllSupplier);

// SHOW DETAIL
router.get('/:id', getSupplierById);

// ADD NEW 
router.post('/', addSupplier);

// UPDATE
router.put('/:id', updateSupplier);

// DELETE
router.delete('/:id', deleteSupplierById);

module.exports = router;