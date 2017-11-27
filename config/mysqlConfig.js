const Sequelize = require('sequelize');
const mysqlSequelize = new Sequelize(
	'admin',
	'root',
	'root',
	{
		'dialect': 'mysql',
		'host': 'localhost',
		'port': 3306
	}
);
module.exports = mysqlSequelize;
