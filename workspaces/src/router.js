var Router = require('express').Router
var router = new Router()

var _ = require('lodash')


//Services

var createWorkSpace = require('./services/createWorkSpace.company')
var updateWorkSpace = require('./services/updateWorkSpace.companies')

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







module.exports = router