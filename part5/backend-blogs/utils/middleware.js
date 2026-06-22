const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('METHOD: ', request.method)
    logger.info('PATH: ', request.path)
    logger.info('BODY: ', request.body)
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.name, " = ", error.message)

    if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error collection')){
        return response.status(400).json({ error: 'username not available' })
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }else if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'you are not authorized' })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const token = request.get('Authorization')
    if(token && token.startsWith('Bearer ')){
        const user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET)
        if(!user || !user.id){
            return response.status(401).json({ error: 'you are not authorized' })
        }
        request.user = user
    }
    else{
        return response.status(401).json({ error: 'missing authorization header' })
    }
    next()
}

module.exports = { requestLogger, errorHandler, tokenExtractor }