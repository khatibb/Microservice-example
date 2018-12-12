var companies = require('../models/companies')
var checkIfExists = require('./helpers/checkIfExists')
var getObjectIndex = require('./helpers/getObjectIndex')

function updateWorkSpace(req, res) {
    var companyName = req.body.companyName // company name to to add to 
    var workSpaceName = req.body.workSpaceName //  WorkSpace display name
    var toUpdateName = req.body.toUpdateName //  WorkSpace new name to be update
    companies.findOne({
        $and: [
            { displayName: companyName },
            { 'workspaces.name': workSpaceName.toLowerCase() }
        ]
    }, function(err, company) {

        if (err || !company) {
            var message = 'Company or the work space within that company doesnt exist !'
            if (err) {
                message = 'an error occured please check the log(s)'
            }
            return res.status(422).json({
                success: false,
                message: message
            })

        }
        var displayNameExists = checkIfExists(company.workspaces, 'name', toUpdateName.toLowerCase())

        if (displayNameExists) {
            return res.status(422).json({
                success: false,
                message: 'a work space with the same name already exists , please pick a new name !'
            })

        }
        var Index = getObjectIndex(company.workspaces, 'name', workSpaceName.toLowerCase())

        company.workspaces[Index].displayName = toUpdateName
        company.save(function(err, company) {
            if (!err && company) {

                return res.status(200).json({
                    success: true,
                    message: 'update work space successfully '
                })


            } else {
                return res.status(200).json({
                    success: true,
                    message: 'couldnt find workspace '
                })
            }

        })





    }

    )
}


module.exports = updateWorkSpace