const { authToken, channelId } = require('./config')
require('./src/write-messages')(authToken, channelId)
