var Router = require('express').Router
var router = new Router()

var _ = require('lodash')
var validator = require('validator')

//Services
var addUser = require('./services/addUser.workspace.company')
var removeUser = require('./services/removerUser.workspace.company')

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
