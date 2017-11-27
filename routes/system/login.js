const express = require('express');
const router = express.Router();
const User = require('../../models/user');
router.post('/login', function (req, res) {
	if (!req.body.account || req.body.account == '' || !req.body.password || req.body.password == '') {
		return res.json({
			'code': 20001,
			'success': false,
			'msg': '账号或密码为空'
		});
	}
	User.findOne({
		where: {
			account: req.body.account,
			password: req.body.password
		}
	}).then(function (results) {
		console.log(results);
		console.log(results.last);
		if (results) {
			results.update({ 'last': new Date().toLocaleString(), 'visits': ++results.visits });
			return res.json({
				'code': 20000,
				'success': true,
				'user': { name: results.realname, avatar: results.image },
				'msg': '登陆成功'
			});
		}
		return res.json({
			'code': 20002,
			'success': false,
			'msg': '账号或密码不正确'
		});
	}).catch(function (err) {
		console.log(err);
	});
});
module.exports = router;