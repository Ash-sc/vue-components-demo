var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var notFound = require('./middlewares/notFound')
var simpleLogger = require('./middlewares/simpleLogger')
var path = require('path')

var app = express()

app.use('/uploaded-file/', express.static(path.resolve(__dirname, './static')))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

// set json header
app.use(function(req, res, next) {
  res.contentType('application/json')
  next()
})

app.use(simpleLogger)

const filesManagementController = require('./controllers/filesManagementController')

app.use('/files/', filesManagementController)

app.use(notFound)

app.listen(3234)

module.exports = app
