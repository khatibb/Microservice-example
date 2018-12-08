const connectToMongo = require('./src/config/mongo')
const startServer = require('./src/config/server')

connectToMongo(process.env.MONGO_URL || 'mongodb://localhost:27017/xaraTask')
startServer(process.env.PORT || 5000)