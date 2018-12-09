var Router = require('express').Router
var router = new Router()

var companies = require('./models/companies')
var _ = require('lodash')

router.post('/api/v1/createcompany', function(req, res) {
    if (_.isEmpty(req.body)) {
        return res.status(400).json({ success: false, message: 'Empty Request Body' })
    }
    var displayName = req.body.displayName
    if (!displayName) {
        return res.status(400).json({ success: false, message: 'Please enter a display name' })

    }

    companies.findOne({ name: displayName.toLowerCase() }, function(err, company) {
        if (!err && company) {
            return res.status(400).json({ success: false, message: 'A company with same name already exists' })
        }

        var newCompany = new companies({
            displayName: displayName
        })
        newCompany.save(function(err, company) {
            if (!err && company) {
                return res.status(200).json({ success: true, message: 'Company created successfuly' })

            }
            return res.status(400).json({ success: false, message: err })

        })

    })


})

// router.post('/api/v1/updatecompany', function(req, res) {

// })

// router.post('/api/v1/company/creatworkspace', function(req, res) {

// })
// router.post('/api/v1/company/updateworkspace', function(req, res) {

// })
// router.post('/api/v1/company/workspace/addUser', function(req, res) {

// })
// router.post('/api/v1/company/workspace/deletUser', function(req, res) {

// })






module.exports = router