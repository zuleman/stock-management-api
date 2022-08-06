const express = require('express');
const router = express.Router();

// router.use('/', require('./authentication'));
router.use('/customer', require('./customer'));

// 404 - NOT FOUND
router.use('/', (req, res) => {
	res.status(404).send({msg: '404 - Not Found'});
});

module.exports = router;