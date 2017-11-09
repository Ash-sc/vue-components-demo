var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var notFound = require('./middlewares/notFound')
var simpleLogger = require('./middlewares/simpleLogger')

var app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

// set json header
app.use(function(req, res, next) {
  res.contentType('application/json')
  next()
})

app.use(simpleLogger)

const qaManagementCtrl = require('./controllers/qaManagementCtrl')
app.use('/qa/', qaManagementCtrl)

app.use(notFound)

app.listen(9092)

module.exports = app
