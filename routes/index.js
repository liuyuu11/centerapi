var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio');
/* GET home page. */
router.post('/getHtml', function (req, res) {
	console.log(req.body);
	// res.render('index', { title: 'Express' });
	if (!req.body.url) {
		res.json({
			'code': 400,
			'success': false,
			'msg': 'url参数不存在'
		});
		return;
	}
	if (req.body.url.search('http://') < 0 && req.body.url.search('https://') < 0) {
		res.json({
			'code': 400,
			'success': false,
			'msg': 'url地址有误，请输入正确的url地址'
		});
		return;
	}
	var params = req.body.params;
	var data = [];
	http.get(req.body.url, function (response) {
		var html = '';
		response.on('data', function (data) {
			html += data;
		});
		response.on('end', function () {
			var $ = cheerio.load(html);
			if (!params) {
				data.push($('body').html());
				res.json({
					'code': 200,
					'success': true,
					'msg': '返回body内容',
					'data': data
				});
				return;
			}
			for (var i = 0; i < params.length; i++) {
				switch (params[i].fn) {
					case 'text':
						data.push($(params[i].dom).text());
						break;
					case 'html':
						data.push($(params[i].dom).html());
						break;
					case 'attr':
						data.push($(params[i].dom).attr(params[i].prop));
						break;
					default:
						data.push($(params[i].dom).text());
				}
			}
			res.json({
				'code': 200,
				'success': true,
				'msg': '爬取数据成功',
				'data': data
			});
		});
	});
});

// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// });

// router.get("/test", (req, res) => {
// 	//发送cookie(名称，数据，过期时间)
// 	res.cookie("login", {
// 		"name": "abc"
// 	}, {
// 		maxAge: 1000 * 60 * 60 * 24
// 	});
// 	if (req.cookies["login"]) {
// 		//一种新的发送数据到前端页面
// 		res.locals.login = req.cookies.login.name;
// 	}
// 	res.send('see your cookie');
// })
module.exports = router;