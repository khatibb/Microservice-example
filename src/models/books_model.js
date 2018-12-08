var mongoose = require('mongoose')
var Schema = mongoose.Schema

var companies = new Schema({
    displayName: { type: String, required: true },
    name: { type: String, unique: true, index: true },
    workspaces: [workSpace]
})

var workSpace = new Schema({
    displayName: { type: String, required: true },
    //NAME HAS TO BE UNIQUE WITHIN THE COMPANY IT BELONGS TO -> Query?
    name: { type: String, index: true },
    // email has to be unique withing the context of the workspace it belongs to
    email: { type: String, index: true, unique: true },
    role: { type: String, enum: ['basic', 'admin'] }
})


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