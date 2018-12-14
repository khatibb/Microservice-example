var companies = require('../models/companies')

function updateCompany(req, res) {

    var displayName = req.body.displayName
    var toUpdateName = req.body.toUpdateName

    companies.findOne({ name: displayName.toLowerCase() },
        function(err, company) {
            //check if the company to be-updated exists or not
            if (err || !company) {
                var message = 'No company exists with this display name'
                if (err) {
                    message = 'an error occured please check the log(s)'
                }
                return res.status(422).json({
                    success: false,
                    message: message
                })
            }
            // check if there isnt a company that has a display name similar to the new one
            companies.findOne({ name: toUpdateName.toLowerCase() }, function(err, companyDuplicate) {
                if (err || companyDuplicate) {
                    var message = 'cant update : a company already exists with that name'
                    if (err) {
                        message = 'an error occured please check the log(s)'
                    }
                    return res.status(422).json({
                        success: false,
                        message: message
                    })
                } else {
                    // no company exists with that name -> safe to update


                    company.displayName = toUpdateName

                    company.save(function(err, company) {
                        if (!err && company) {
                            return res.status(200).json({
                                success: true,
                                message: 'Company updated successfully',
                                company: company
                            })
                        }
                        return res.status(422).json({
                            success: false,
                            message: 'an error occured please check the log(s)'
                        })
                    })

                }
            })



        })
}





module.exports = updateCompany