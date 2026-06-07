const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { userId: 0 })
    return response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.password || body.password.length <= 3){
        return response.status(400).json({ error: "password cannot be shorter than 3" })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(body.password, salt)

    const newUser = new User({
        name: body.name,
        username: body.username,
        passwordHash: passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter