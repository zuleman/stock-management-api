const { Sequelize } = require('sequelize');

require("dotenv").config();
const {DBHOST, DBNAME, DBUSER, DBPASSWORD} = process.env;

const dbConnect = () => {
	const sequelize = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
	  host: DBHOST,
	  dialect: 'mysql',
	  timezone: "+07:00"
	});

	return sequelize;
}

module.exports = dbConnect;