const info = (...params) => {
    if(process.env.NODE_ENVIRONMENT !== 'testing')
        console.log(...params)
}

const error = (...params) => {
    if(process.env.NODE_ENVIRONMENT !== 'testing')
        console.error(...params)
}

module.exports = { info, error }