var mongoose = require('mongoose')



var user = new mongoose.Schema({
    // email has to be unique withing the context of the workspace it belongs to
    email: { type: String, index: true },
    role: { type: String, enum: ['basic', 'admin'] }
})


var workSpace = new mongoose.Schema({
    displayName: { type: String, required: true },
    //NAME HAS TO BE UNIQUE WITHIN THE COMPANY IT BELONGS TO -> Query?
    name: { type: String, index: true },
    users: [user]
}, { timestamps: true })



var companies = new mongoose.Schema({
    displayName: { type: String, required: true },
    name: { type: String, unique: true, index: true },
    workspaces: [workSpace]
}, { timestamps: true })


// a pre-hook (s)to generate the the company name(and convert it to lowecase) on demand(before saving )
companies.pre('save', function(next) {
    var companies = this
    companies.name = (companies.displayName).toLowerCase()
    next()
})
workSpace.pre('save', function(next) {
    var workSpace = this
    workSpace.name = (workSpace.displayName).toLowerCase()
    next()
})
module.exports = mongoose.model('companies', companies)