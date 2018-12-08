const express = require('express')
const bodyParser = require('body-parser')

//const cors = require('cors')

const routes = require('../router')


var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(cors())
app.use(routes)


module.exports = app