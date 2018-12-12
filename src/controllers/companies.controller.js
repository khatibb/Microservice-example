var companies = require('../models/companies')
var _ = require('lodash')
var async = require('async')
//async Library is used to help with managing callbacks for readability and avoiding callback hell

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
                message: 'Request is missing a parameter(s)!'
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
                message: 'Request is missing a parameter(s)!'
            })

        }
        //Im using FindOne+save since findOneAndUpdate doesnt trigger the 'save' pre-hook
        async.waterfall([
            //1
            function getCompany(next) {
                companies.findOne({ name: displayName.toLowerCase() },
                    function(err, company) {
                        if (err || !company) {
                            return res.status(422).json({
                                success: false,
                                message: 'Couldnt find company'
                            })
                        } else if (company) {
                            next(null, company)
                        }
                    }
                )
            },
            //2
            function saveCompany(company) {
                company.displayName = toUpdateName
                company.save(function(err, company) {
                    if (!err && company) {
                        return res.status(200).json({
                            success: true,
                            message: 'Company updated successfully'
                        })
                    }
                    return res.status(422).json({
                        success: false,
                        message: 'Couldnt update company'
                    })
                })
            }

        ])

    }
    //// END OF UPDAET COMPANY//
}
module.exports = companiesController