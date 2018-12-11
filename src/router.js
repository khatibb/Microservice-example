var Router = require('express').Router
var router = new Router()


var companies = require('./controllers/companies.controller')
var workSpaces = require('./controllers/workspaces.companies.controller')
var workSpaceUsers = require('./controllers/users.workspaces.companies')

router.post('/api/v1/createcompany', companies.createCompany)
router.post('/api/v1/updatecompany', companies.updateCompany)

router.post('/api/v1/company/createworkspace', workSpaces.createWorkSpace)
router.post('/api/v1/company/updateworkspace', workSpaces.updateWorkSpace)

router.post('/api/v1/company/workspace/associateUser', workSpaceUsers.associateUser)
router.post('/api/v1/company/workspace/removeUser', workSpaceUsers.removeUser)

module.exports = router