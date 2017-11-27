const router = require('express').Router();
const Role = require('../../models/role');

//新增角色
router.post('/role', function (req, res) {
	if (!req.body.roleName || req.body.roleName == '') {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '角色名不能为空'
		});
	}
	let roleInfo = {
		'roleName': req.body.roleName,
		'roleDesc': req.body.roleDesc,
		'createdAt': new Date().toLocaleString(),
		'updatedAt': new Date().toLocaleString()
	};
	Role.findOne({
		where: {
			roleName: req.body.roleName
		}
	}).then(function (results) {
		if (!results) {
			Role.create(roleInfo).then(function (roleData) {
				if (roleData) {
					return res.json({
						'code': 20000,
						'success': true,
						'msg': '添加角色成功'
					});
				} else {
					return res.json({
						'code': 20003,
						'success': false,
						'msg': '添加角色失败'
					});
				}
			})
		}
		return res.json({
			'code': 20004,
			'success': false,
			'msg': '该角色已经存在'
		});
	})
});

//查询角色
router.get('/role', function (req, res) {
	Role.findAll().then(function (results) {
		if (results) {
			return res.json({
				'code': 20000,
				'success': true,
				'data': results,
				'msg': '查询成功'
			});
		}
		return res.json({
			'code': 20005,
			'success': false,
			'msg': '查询失败'
		});
	})
})

//修改角色
router.put('/role/:roleName', function (req, res) {
	console.log(req.params.roleName);
	if (req.query.roleName == '') {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '角色不允许为空'
		});
	}
	if (!req.query.roleName && !req.query.roleDesc) {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '没有提交任何修改的数据'
		});
	}
	let roleInfo = {
		'roleName': req.query.roleName,
		'roleDesc': req.query.roleDesc,
		'updatedAt': new Date().toLocaleString()
	};
	Role.findOne({
		where: {
			'roleName': req.params.roleName
		}
	}).then(function (roleData) {
		if (roleData) {
			roleData.update(roleInfo, {
				where: {
					roleName: req.params.roleName
				}
			}).then(function (results) {
				if (results) {
					return res.json({
						'code': 20000,
						'success': true,
						'msg': '修改角色成功'
					});
				}
				return res.json({
					'code': 20006,
					'success': false,
					'msg': '修改角色失败'
				});
			})
		}
		return res.json({
			'code': 20005,
			'success': false,
			'msg': '角色不存在'
		});
	})
})

module.exports = router;