var Router = require('express').Router
var router = new Router()

var _ = require('lodash')
var validator = require('validator')

//Services
var createCompany = require('./services/createCompany')
var updatecompany = require('./services/updateCompany')
var createWorkSpace = require('./services/createWorkSpace.company')
var updateWorkSpace = require('./services/updateWorkSpace.companies')
var addUser = require('./services/addUser.workspace.company')
var removeUser = require('./services/removerUser.workspace.company')

router.post('/api/v1/createcompany', function(req, res) {
    if (_.isEmpty(req.body)) {
        return res.status(400).json({
            success: false,
            message: 'Empty Request Body'
        })
    }
    var displayName = req.body.displayName
    if (!displayName) {
        return res.status(422).json({
            success: false,
            message: 'Request is missing a parameter(s)!'
        })
    }

    createCompany(req, res)
})

router.post('/api/v1/updatecompany', function(req, res) {

    if (_.isEmpty(req.body)) {
        return res.status(400).json({ success: false, message: 'Empty Request Body' })
    }
    var displayName = req.body.displayName
    var toUpdateName = req.body.toUpdateName

    if (!displayName || !toUpdateName) {
        return res.status(422).json({
            success: false,
            message: 'Request is missing a parameter(s)!'
        })

    }
    updatecompany(req, res)

})

router.post('/api/v1/company/createworkspace', function(req, res) {

    if (_.isEmpty(req.body)) {
        return res.status(400).json({ success: false, message: 'Empty Request Body' })

    }
    var companyName = req.body.companyName // company name to to add to 
    var workSpaceName = req.body.workSpaceName // new WorkSpace display name

    if (!companyName || !workSpaceName) {
        return res.status(422).json({
            success: false,
            message: 'Request is missing a parameter(s)!'
        })
    }
    createWorkSpace(req, res)

})

router.post('/api/v1/company/updateworkspace', function(req, res) {

    if (_.isEmpty(req.body)) {
        return res.status(400).json({ success: false, message: 'Empty Request Body' })
    }
    var companyName = req.body.companyName // company name to to add to 
    var workSpaceName = req.body.workSpaceName //  WorkSpace display name
    var toUpdateName = req.body.toUpdateName //  WorkSpace new name to be update

    if (!companyName || !workSpaceName || !toUpdateName) {
        return res.status(422).json({
            success: false,
            message: 'Request is missing a parameter(s)!'
        })

    }
    updateWorkSpace(req, res)

})



router.post('/api/v1/company/workspace/addUser', function(req, res) {

    if (_.isEmpty(req.body)) {
        return res.status(400).json({ success: false, message: 'Empty Request Body' })
    }
    var companyName = req.body.companyName // company name to to add to 
    var workSpaceName = req.body.workSpaceName //  WorkSpace display name
    var email = req.body.email
    var role = req.body.role

    if (!companyName || !workSpaceName || !email || !role) {
        return res.status(422).json({
            success: false,
            message: 'Request is missing a parameter(s)!'
        })

    }
    if (!validator.isEmail(email)) {
        return res.status(422).json({
            success: false,
            message: 'Invalid email format'
        })
    }


    if ((role !== 'admin') && (role !== 'basic')) {
        return res.status(422).json({
            success: false,
            message: 'Role has to be basic or admin '
        })
    }

    addUser(req, res)

})

router.post('/api/v1/company/workspace/removeUser', function(req, res) {

    if (_.isEmpty(req.body)) {
        return res.status(400).json({ success: false, message: 'Empty Request Body' })
    }
    var companyName = req.body.companyName // company name to to add to 
    var workSpaceName = req.body.workSpaceName //  WorkSpace display name
    var email = req.body.email


    if (!companyName || !workSpaceName || !email) {
        return res.status(422).json({
            success: false,
            message: 'Request is missing a parameter(s)!'
        })

    }
    if (!validator.isEmail(email)) {
        return res.status(422).json({
            success: false,
            message: 'Invalid email format'
        })
    }

    removeUser(req, res)

})




module.exports = router