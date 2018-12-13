var companies = require('../models/companies')
var checkIfExists = require('./helpers/checkIfExists')

function createWorkSpace(req, res) {
    var companyName = req.body.companyName // company name to to add to 
    var workSpaceName = req.body.workSpaceName // new WorkSpace display name
    companies.findOne({
        $or: [{ displayName: companyName },
            { name: companyName.toLowerCase() }
        ]
    }, {

    }, function(err, company) {

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
        var aWorkSpaceExists = checkIfExists(company.workspaces, 'name', workSpaceName.toLowerCase())

        if (aWorkSpaceExists) {
            return res.status(422).json({
                success: false,
                message: 'a work space with the same name already exists , please pick a new name !'
            })

        }

        company.workspaces.push({ displayName: workSpaceName })
        company.save(function(err, company) {
            if (!err && company) {

                return res.status(200).json({
                    success: true,
                    message: 'Added workspace successfully'
                })
            } else {
                return res.status(422).json({
                    success: false,
                    message: 'an error occured please check the log(s)'
                })
            }
        })



    }

    )
}


module.exports = createWorkSpace