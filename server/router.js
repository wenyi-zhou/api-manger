var express = require('express')
var sign = require('./sign')

var router = express.Router()

router.post('/login', sign.login)  // 登出
router.post('/loginOut', sign.loginOut)  // 进入登录页面

module.exports = router
