var Router = require('express').Router
var router = new Router()
var companies = require('./controllers/companies.controllers')

router.post('/api/v1/createcompany', companies.createCompany)



router.post('/api/v1/updatecompany', companies.updateCompany)

// router.post('/api/v1/company/creatworkspace', function(req, res) {

// })
// router.post('/api/v1/company/updateworkspace', function(req, res) {

// })
// router.post('/api/v1/company/workspace/addUser', function(req, res) {

// })
// router.post('/api/v1/company/workspace/deletUser', function(req, res) {

// })






module.exports = router