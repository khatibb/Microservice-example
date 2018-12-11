var companies = require('../models/companies')
var _ = require('lodash')
var async = require('async')


var companiesController = {

    createCompany: function(req, res) {
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
                message: 'Request is missing parameters!'
            })

        }
        async.waterfall([
            //1
            function ifCompanyExists(next) {
                companies.findOne({ name: displayName.toLowerCase() },
                    function(err, company) {
                        if (!err && company) {
                            return res.status(409).json({
                                success: false,
                                message: 'company already exists'
                            })
                        } else {
                            next(null)
                        }
                    })


            },
            //2
            function addCompany() {
                //Creatng New Company
                var newCompany = new companies({
                    displayName: displayName
                })
                // Saving the new entry to DB
                newCompany.save(function(err, company) {
                    if (!err && company) {
                        return res.status(200).json({
                            success: true,
                            message: 'Company created successfully'
                        })
                    }
                    return res.status(422).json({
                        success: false,
                        message: 'Couldnt create company'
                    })

                })


            },

        ]

        )

    } /////END OF createCompany/////
    ,
    updateCompany: function(req, res) {
        if (_.isEmpty(req.body)) {
            return res.status(400).json({ success: false, message: 'Empty Request Body' })
        }
        var displayName = req.body.displayName
        var toUpdateName = req.body.toUpdateName
        if (!displayName || !toUpdateName) {
            return res.status(422).json({
                success: false,
                message: 'Request is missing parameters!'
            })

        }
        companies.findOneAndUpdate({ name: displayName.toLowerCase() }, { $set: { displayName: toUpdateName } },
            function(err, company) {

                if (!err && company) {
                    return res.status(200).json({
                        success: true,
                        message: 'Company name update successfully'
                    })
                }
                return res.status(422).json({
                    success: false,
                    message: 'Couldnt update company'
                })

            })
    }
}
module.exports = companiesController