const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('METHOD: ', request.method)
    logger.info('PATH: ', request.path)
    logger.info('BODY: ', request.body)
    next()
}

module.exports = { requestLogger }