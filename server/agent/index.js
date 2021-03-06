var webRequest = require('request')
var logger = require('../log/logger')

const requestOptions = function () {
  return {
    baseUrl: 'https://api.weitrun.com',
    method: 'POST',
    url: ''
  }
}

const errorMsg = function () {
  return {
    'code': 401,
    'msg': '响应超时，稍后再试'
  }
}

module.exports = function (req, res) {
  var options = requestOptions()
  options.url = req.originalUrl
  options.form = req.body
  // logger.info(req.originalUrl + ' params:' + JSON.stringify(req.body))
  const callback = function (error, response, data) {
    if (!error && response.statusCode === 200) {
      res.send(data)
    } else {
      logger.error(options.url)
      if (data) {
        logger.error(data)
        res.status(response.statusCode).send(data)
      } else {
        logger.error(error)
        res.status(404).send(errorMsg())
      }
    }
  }
  try {
    webRequest(options, callback)
  } catch (e) {
    logger.error(e)
  }
}
