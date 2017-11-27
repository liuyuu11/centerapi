const Sequelize = require('sequelize');
const mysqlSequelize = require('../config/mysqlConfig');
//用户表模型
const User_role = mysqlSequelize.define('user_role', {
	id: {//自增长id，主键，整型
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		comment: '用户角色关系表id'
	},
	roleId: {
		type: Sequelize.INTEGER,
		unqiue: true,
		comment: '角色id'
	},
	userId: {
		type: Sequelize.INTEGER,
		unqiue: true,
		comment: '用户id'
	}
}, {
		freezeTableName: true,
		tableName: 'user_role',
		timestamps: false
	});
module.exports = User_role;