var app = require('./app')

module.exports = function(port) {
    app.listen(port, function() {
        console.log('Listening on port ' + port)
    })
}