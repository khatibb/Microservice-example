var connectToMongo = require('./src/config/mongo')
var startServer = require('./src/config/server')

connectToMongo(process.env.MONGO_URL || 'mongodb://localhost/Business')
startServer(process.env.PORT || 5000)


//TO-DO before shipping
/*
remove console.log from server
*/