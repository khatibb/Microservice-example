var mongoose = require('mongoose')
module.exports = function(URL, callback) {
    callback = callback || function() {}

    mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex: true })
    var db = mongoose.connection

    db.on('error', function(req, res) {
        console.error.bind(console, 'connection error:')
        callback(err)
    })

    db.once('open', function() {
        console.log('Connected to MongoDB on ' + URL)
        callback()
    })
}