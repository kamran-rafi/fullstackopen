const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const user = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    
    const userExists = await User.findOne({ username: body.username })

    const correctUser = userExists === null ? null : await bcrypt.compare(body.password, userExists.passwordHash);

    if(!correctUser){
        return response.status(404).json({ error: 'user not found' })
    }

    const token = jwt.sign({ id: userExists.id, username: userExists.username }, process.env.SECRET)

    response.status(200).json({token, user: userExists})
})

module.exports = loginRouter