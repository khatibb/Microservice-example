var companies = require('../models/companies')
var _ = require('lodash')
var async = require('async')
//async Library is used to help with managing callbacks for readability and avoiding callback hell

var checkIfExists = require('../services/checkIfExists')

var workspacesController = {
    createWorkSpace: function(req, res) {
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

        async.waterfall([
            function getCompanyIfexists(next) {
                companies.findOne({
                    $or: [{ displayName: companyName },
                        { name: companyName.toLowerCase() }
                    ]


                }, function(err, company) {
                    if (err || !company) {
                        return res.status(422).json({
                            success: false,
                            message: 'Company doesnt exist , Please enter a valid company name !'
                        })
                    } else if (company) {
                        next(null, company)
                    }

                })
            },
            function addWorkSpace(company) {

                var workSpaceExists = checkIfExists(company.workspaces, 'name', workSpaceName.toLowerCase())
                if (!workSpaceExists) {
                    company.workspaces.push({ displayName: workSpaceName })

                    company.save(function(err, company) {
                        if (!err && company) {
                            console.log('ramet fel DB khalas')
                            return res.status(200).json({
                                success: true,
                                message: 'Added workspace successfully'
                            })
                        }
                    })
                } else {
                    return res.status(422).json({
                        success: false,
                        message: 'a work space with the same name already exists !'
                    })
                }
            }

        ])
    },
    updateWorkSpace: function(req, res) {

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

        async.waterfall([

            function getCompanyIfexists(next) {
                companies.findOne({
                    $or: [{ displayName: companyName },
                        { name: companyName.toLowerCase() }
                    ]


                }, function(err, company) {
                    var displayNameExists = checkIfExists(company.workspaces, 'name', toUpdateName.toLowerCase())

                    if (displayNameExists) {
                        return res.status(422).json({
                            success: false,
                            message: 'a work space with the same name already exists , please pick a new name !'
                        })
                    }

                    if (err || !company) {
                        return res.status(422).json({
                            success: false,
                            message: 'Company doesnt exist , Please enter a valid company name !'
                        })

                    } else if (company) {

                        next(null, company)
                    }

                })

            },
            function updateWorkSpaceName(company) {
                //To-DO : refactor code to aysnc

                companies.findOne({ 'workspaces.name': workSpaceName.toLowerCase() }, {
                    'workspaces.$': 1
                }, function(err, workspace) {

                    if (!err && workspace) {

                        workspace.displayName = toUpdateName.toLowerCase()
                        workspace.save(function(err, doc) {

                            if (!err && doc) {
                                return res.status(200).json({
                                    success: true,
                                    message: 'updated workspace name successfully'
                                })
                            } else {
                                return res.status(200).json({
                                    success: true,
                                    message: 'couldnt update workspace name'
                                })
                            }

                        })



                    } else {
                        return res.status(200).json({
                            success: true,
                            message: 'couldnt find workspace '
                        })
                    }
                }

                )

            }

        ])
    }
}
module.exports = workspacesController