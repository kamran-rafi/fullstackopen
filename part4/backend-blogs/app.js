const express = require('express')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

console.log('Connecting to DB: ', MONGODB_URI)
mongoose.connect(MONGODB_URI, { family: 4 })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

module.exports = app