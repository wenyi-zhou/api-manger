var https = require('https')

// var options={
//   path,
//   params
// }
function send (options, callback) {
  if (!options.params) {
    options.params = {}
  }
  var bodyString = JSON.stringify(options.params)
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
  }

  var requestOptions = {
    host: 'api.weitrun.cn',
    port: 10009,
    path: options.path,
    method: 'POST',
    headers: headers
  }

  var req = https.request(requestOptions, function (res) {
    res.setEncoding('utf-8')

    var responseString = ''
    res.on('data', function (data) {
      responseString += data
    }).on('end', function () {
      if (callback && typeof callback === 'function') {
        callback(undefined, res, responseString)
      }
    })

    req.on('error', function (e) {
      if (callback && typeof callback === 'function') {
        callback(e, res, undefined)
      }
    })
  })

  req.write(bodyString)
  req.end()
}

module.exports = send

