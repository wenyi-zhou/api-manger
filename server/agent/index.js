var webRequest = require('request')
var logger = require('../log/logger')

function requestOptions () {
  return {
    baseUrl: 'https://api.weitrun.cn:10009',
    method: 'POST',
    url: ''
  }
}

function errorMsg (error) {
  return {
    'code': 401,
    'msg': error
  }
}

module.exports = function (req, res) {
  var options = requestOptions()
  options.url = req.originalUrl
  options.form = req.body
  // logger.info(req.originalUrl + ' params:' + JSON.stringify(req.body))
  function callback (error, response, data) {
    if (!error && response.statusCode === 200) {
      res.send(data)
    } else {
      logger.error(error)
      res.send(errorMsg())
    }
  }
  try {
    webRequest(options, callback)
  } catch (e) {
    logger.error(e)
  }
}
