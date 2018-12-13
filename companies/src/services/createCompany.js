var companies = require('../models/companies')

function createCompany(req, res) {
    var displayName = req.body.displayName

    companies.findOne({ name: displayName.toLowerCase() },
        function(err, company) {

            if (err || company) {
                var message = 'a company with the same name exists , choose another one !'
                if (err) {
                    message = 'an error occured please check the log(s)'
                }
                return res.status(409).json({
                    success: false,
                    message: message
                })
            } else {

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
                        message: 'an error occured please check the log(s)'
                    })

                })
            }
        })
}

module.exports = createCompany