var sendRequest = require('./sendRequest')
var logger = require('../log/logger')

module.exports = function (req, res) {
  var options = {}
  options.path = req.originalUrl
  options.params = req.body
  logger.info(req.originalUrl + ' params:' + JSON.stringify(req.body))
  function callback (error, response, data) {
    if (!error && response.statusCode === 200) {
      res.send(data)
    } else {
      res.send(error)
    }
  }
  sendRequest(options, callback)
}
