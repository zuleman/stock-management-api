const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

	let result = { success: false, error: [] }
	const token = req.body.token || req.query.token || req.headers["x-token"];

	if (!token) {
		result.error = 'Token is required.';
		return res.status(403).send(result);
	} else {
		jwt.verify(token, process.env.TOKEN_KEY, function(error, payLoad) {
			if (error) {
				result.error = error;

				return res.status(401).send(result);	
			} else {
				req.payload = payLoad;
				return next();
			}
		});
	}
};

module.exports = verifyToken;