var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookSchema = new Schema({
    name: String,
    type: { type: String, default: 'book' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Book', BookSchema)