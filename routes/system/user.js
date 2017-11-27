const router = require('express').Router();
const User = require('../../models/user');
const User_role = require('../../models/user_role');
//const Promise = require('bluebird');

router.post('/user', function (req, res) {
	if (!req.body.account || req.body.account == '') {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '用户名不能为空'
		});
	}
	if (!req.body.password || req.body.password == '') {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '密码不能为空'
		});
	}
	if (!req.body.realname || req.body.realname == '') {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '昵称不能为空'
		});
	}
	let userInfo = {
		'account': req.body.account,
		'password': req.body.password,
		'realname': req.body.realname,
		'sex': req.body.sex,
		'birthday': req.body.birthday,
		'address': req.body.address,
		'image': req.body.image,
		'phone': req.body.phone,
		'email': req.body.email,
		'qq': req.body.qq,
		'createdAt': new Date(),
		'updatedAt': new Date()
	};
	console.log(userInfo);
	User.create(userInfo).then(results => {
		if (results) {
			return res.json({
				'code': 20000,
				'success': true,
				'msg': '添加用户成功'
			});
		} else {
			return res.json({
				'code': 20003,
				'success': false,
				'msg': '添加用户失败'
			});
		}
	}).catch(err => {
		if (err.name == 'SequelizeUniqueConstraintError') {
			return res.json({
				'code': 20004,
				'success': false,
				'msg': '用户名已存在'
			});
		}
		console.log(err);
	})
});

router.get('/user/:realname', function (req, res) {
	User.findAndCountAll({
		where: {
			realname: req.params.realname
		}
	}).then(results => {
		if (results) {
			return res.json({
				'code': 20000,
				'success': true,
				'data': {
					'count': results.count,
					'rows': results.rows
				},
				'msg': '查询成功'
			});
		}
		return res.json({
			'code': 20005,
			'success': false,
			'msg': '用户不存在'
		});
	});
});

router.get('/user', function (req, res) {
	let pageIndex = Number(req.query.pageIndex) - 1 || 0,
		pageSize = Number(req.query.pageSize) || 20;
	User.findAndCountAll({
		limit: pageSize, //每页多少条
		offset: pageSize * pageIndex, //页数
		order: [
			['createAt', 'DESC']
		] //按照更新日期倒序
	}).then(function (results) {
		if (results) {
			return res.json({
				'code': 20000,
				'success': true,
				'data': {
					'count': results.count,
					'rows': results.rows
				},
				'msg': '查询成功'
			});
		}
		return res.json({
			'code': 20005,
			'success': false,
			'msg': '查询失败'
		});
	});
})

//删除用户接口
router.delete('/user/:userId', function (req, res) {
	let userList = req.params.userId.split(',');
	User.destroy({
		where: {
			user_id: userList
		}
	}).then(function (results) {
		if (results) {
			return res.json({
				'code': 20000,
				'success': true,
				'msg': '删除用户成功'
			});
		}
		return res.json({
			'code': 20006,
			'success': false,
			'msg': '删除用户失败'
		});
	})
});

//修改
router.put('/user', function (req, res) {
	let userInfo = {
		'password': req.body.password,
		'realname': req.body.realname,
		'sex': req.body.ex,
		'birthady': req.body.birthady == '' ? null : req.body.birthady,
		'address': req.body.address,
		'image': req.body.image,
		'phone': req.body.phone,
		'email': req.body.email,
		'qq': req.body.qq,
		'updateAt': new Date()
	};
	console.log(userInfo)
	User.update(userInfo, {
		where: {
			user_id: req.body.user_id
		}
	}).then(results => {
		if (results) {
			return res.json({
				'code': 20000,
				'success': true,
				'msg': '修改成功'
			});
		}
		return res.json({
			'code': 20006,
			'success': false,
			'msg': '修改失败'
		});
	})
})

module.exports = router;