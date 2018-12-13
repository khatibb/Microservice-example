//Model
var companies = require('../models/companies')
    //Helper Functions
var getObjectIndex = require('./helpers/getObjectIndex')
var checkIfExists = require('./helpers/checkIfExists')


function addUser(req, res) {

    var companyName = req.body.companyName
    var workSpaceName = req.body.workSpaceName
    var email = req.body.email
    var role = req.body.role

    companies.findOne({ name: companyName.toLowerCase() }, function(err, company) {
        //Get the company
        if (err || !company) {
            var message = 'couldnt find company'
            if (err) {
                message = 'an error occured please check the log(s)'
            }
            return res.status(422).json({
                success: false,
                message: message
            })

        }
        //Get workspace index in the workspaces array of the company
        var Index = getObjectIndex(company.workspaces, 'name', workSpaceName.toLowerCase())
        if (Index === -1) {
            //couldnt find an instance of the workspace
            return res.status(422).json({
                success: false,
                message: 'couldnt find a workspace with that name'
            })
        }
        //make sure the email isnt used in the corresponding work space


        var emailExists = checkIfExists(company.workspaces[Index].users, 'email', email)
        if (!emailExists) {
            //if the email doesnn't exist -> safe to add user 
            var newUser = {
                email: email,
                role: role
            }

            company.workspaces[Index].users.push(newUser)
            company.save(function(err, company) {
                if (!err && company) {
                    return res.status(200).json({
                        success: true,
                        message: 'added User successfully'
                    })
                }
                return res.status(422).json({
                    success: false,
                    message: 'an error occured please check the log(s)'
                })

            })
        } else {
            return res.status(422).json({
                success: false,
                message: 'email already exists'
            })
        }

    })

}

module.exports = addUser