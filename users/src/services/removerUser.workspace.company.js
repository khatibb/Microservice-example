var companies = require('../models/companies')

function removeUser(req, res) {
    var companyName = req.body.companyName
    var workSpaceName = req.body.workSpaceName
    var email = req.body.email

    var waterfall = require('async-waterfall')
    waterfall([

        function findIfEmailExists(next) {
            companies.findOne({
                $and: [
                    { name: companyName.toLowerCase() },
                    { 'workspaces.name': workSpaceName.toLowerCase() },
                    { 'workspaces.users.email': email.toLowerCase() }

                ]
            }, function(err, company) {

                if (!err && company) {
                    //email exists
                    next(null)
                }
                if (!company) {
                    // if there isnt an error neither a company found that matches the query (i.e no email)
                    return res.status(422).json({
                        success: false,
                        message: 'Email doesnt exist'
                    })

                } else if (err) { // error
                    return res.status(422).json({
                        success: false,
                        message: 'an error occured please check the log(s)--1'
                    })
                }



            })
        },

        function removeUser() {

            companies.updateOne({
                $and: [
                    { name: companyName.toLowerCase() },
                    { 'workspaces.name': workSpaceName.toLowerCase() }

                ]
            }, { $pull: { 'workspaces.$.users': { email: email.toLowerCase() } } }, function(err, result) {


                if (err) {
                    var message = 'an error occured please check the log(s)--2'
                    return res.status(422).json({
                        success: false,
                        message: message,
                    })
                }

                if (result.ok === 1 && result.nModified === 1) {
                    return res.status(200).json({
                        success: true,
                        message: 'user removed successfully',
                    })

                }
            })


        }










    ])



}

module.exports = removeUser