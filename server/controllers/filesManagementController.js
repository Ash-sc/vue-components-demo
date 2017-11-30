var express = require('express')
var router = express.Router()
var path = require('path')
var formidable = require('formidable')

router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = path.resolve(__dirname, '../static/')
  form.keepExtensions = true
  form.hash = false
  form.parse(req, function(err, fields, files) {
    if (!err) {
      res.status(200).json({
        result: 0,
        url: '/static/' + files.file.path.split('/').slice(-1).join()
      })
    } else {
      res.status(200).json({
        result: 1,
        errorInfo: err
      })
    }
  })

})


module.exports = router
