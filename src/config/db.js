const { Sequelize } = require('sequelize');

require("dotenv").config();
const {DBHOST, DBNAME, DBUSER, DBPASSWORD, TIMEZONE} = process.env;

const dbConnect = () => {
	const sequelize = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
	  host: DBHOST,
	  dialect: 'mysql',
	  timezone: TIMEZONE
	});

	return sequelize;
}

module.exports = dbConnect;