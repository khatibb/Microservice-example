var express = require('express')
var bodyParser = require('body-parser')

//var cors = require('cors')

var routes = require('../router')


var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(cors())
app.use(routes)


module.exports = app