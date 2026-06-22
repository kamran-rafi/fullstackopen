const express = require('express')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

console.log('Connecting to DB: ', MONGODB_URI)
mongoose.connect(MONGODB_URI, { family: 4 })

app.use(express.json())
app.use(middleware.requestLogger)

if(process.env.NODE_ENVIRONMENT === "testing"){
    const resetRouter = require("./controllers/reset")
    app.use("/api/testing/reset", resetRouter)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app