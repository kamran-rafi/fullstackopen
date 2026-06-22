require('dotenv').config()

const PORT = process.env.PORT || 3030
const MONGODB_URI = process.env.NODE_ENVIRONMENT === 'testing'
                    ? process.env.TEST_MONGODB_URI
                    : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI }