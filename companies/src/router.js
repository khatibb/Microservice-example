var Router = require('express').Router
var router = new Router()

var _ = require('lodash')
var validator = require('validator')

//Services
var createCompany = require('./services/createCompany')
var updatecompany = require('./services/updateCompany')


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





module.exports = router