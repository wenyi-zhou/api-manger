var validator = require('validator')
// 登录
exports.login = function (req, res) {
  var loginname = validator.trim(req.body.login_name).toLowerCase()
  var pass = validator.trim(req.body.password)
  if (loginname && pass && loginname === 'admin' && pass === '111111') {
    var admin = {
      admin_id: 1,
      admin_name: 'admin'
    }
    res.send({
      code: 200,
      msg: '登录成功',
      data: admin
    })
  } else {
    res.status(403).send({
      code: 403,
      msg: '账号或密码错误'
    })
  }
}

exports.loginOut = function (req, res) {
  res.send({ msg: '成功' })
}
