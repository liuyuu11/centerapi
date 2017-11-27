const Sequelize = require('sequelize');
const mysqlSequelize = require('../config/mysqlConfig');
//用户表模型
const User = mysqlSequelize.define('sys_user', {
	user_id: { //自增长id，主键，整型
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		comment: '用户id'
	},
	account: {
		type: Sequelize.CHAR(30),
		unique: true,
		notNull: true,
		comment: '用户账号'
	},
	password: {
		type: Sequelize.CHAR(32),
		notNull: true,
		comment: '用户密码'
	},
	realname: {
		type: Sequelize.CHAR(10),
		notNull: true,
		comment: '用户真实姓名'
	},
	role: {
		type: Sequelize.CHAR(30),
		comment: '用户角色'
	},
	nickname: {
		type: Sequelize.CHAR(20),
		comment: '用户昵称'
	},
	admin: {
		type: Sequelize.CHAR(1),
		comment: '是否超级管理员'
	},
	birthday: {
		type: Sequelize.DATEONLY,
		comment: '用户生日'
	},
	sex: {
		type: Sequelize.CHAR(1),
		comment: '用户性别'
	},
	email: {
		type: Sequelize.CHAR(90),
		comment: '用户邮箱'
	},
	qq: {
		type: Sequelize.CHAR(20),
		comment: '用户qq'
	},
	phone: {
		type: Sequelize.CHAR(20),
		comment: '用户手机'
	},
	address: {
		type: Sequelize.CHAR(120),
		comment: '用户地址'
	},
	visits: {
		type: Sequelize.INTEGER(5),
		comment: '登录次数'
	},
	ip: {
		type: Sequelize.CHAR(50),
		comment: '登陆ip'
	},
	createAt: {
		type: Sequelize.DATE,
		defaultValue: new Date(),
		comment: '创建时间'
	},
	updateAt: {
		type: Sequelize.DATE,
		defaultValue: new Date(),
		comment: '创建时间'
	},
	last: {
		type: Sequelize.DATE,
		comment: '最后登陆时间'
	},
	status: {
		type: Sequelize.CHAR(1),
		defaultValue: 1,
		comment: '用户状态'
	},
	image: {
		type: Sequelize.CHAR(255),
		comment: '用户图片'
	},
	org_id: {
		type: Sequelize.INTEGER(10),
		comment: '组织id'
	}
}, {
	freezeTableName: true,
	tableName: 'sys_user',
	timestamps: false
});
module.exports = User;