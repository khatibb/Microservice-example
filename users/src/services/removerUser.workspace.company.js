var companies = require('../models/companies')

function removeUser(req, res) {
    var companyName = req.body.companyName
    var workSpaceName = req.body.workSpaceName
    var email = req.body.email


    companies.updateOne({
        $and: [
            { name: companyName.toLowerCase() },
            { 'workspaces.name': workSpaceName.toLowerCase() }

        ]
    }, { $pull: { 'workspaces.$.users': { email: email } } }, function(err, result) {

        if (err) {
            var message = 'an error occured please check the log(s)'
            return res.status(422).json({
                success: false,
                message: message,
                com: result
            })
        }

        if (result.ok === 1 && result.nModified === 1) {
            return res.status(200).json({
                success: true,
                message: 'user removed successfully',
                com: result
            })

        }
    })


}

module.exports = removeUser