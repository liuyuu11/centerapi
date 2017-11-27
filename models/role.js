const Sequelize = require('sequelize');
const mysqlSequelize = require('../config/mysqlConfig');
//用户表模型
const Role = mysqlSequelize.define('role', {
	roleId: {//自增长id，主键，整型
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	roleName: {
		type: Sequelize.STRING(20)
	},
	roleDesc: {
		type: Sequelize.STRING(255)
	}
}, {
		freezeTableName: true,
		tableName: 'role',
		timestamps: false
	});
module.exports = Role;