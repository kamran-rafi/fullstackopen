const { before, test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('when user is created with', () => {
    before(async () => {
        await User.deleteMany()
    })

    test('valid data', async () => {
        const user = {
            name: 'kamran',
            username: 'kamran',
            password: 'kamran123'
        }
        await api
                .post('/api/users')
                .send(user)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    })

    test('invalid username', async () => {
        const user = {
            name: 'kamran',
            username: 'ka',
            password: 'kamran123'
        }
        await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    })

    test('invalid password', async () => {
        const user = {
            name: 'kamran',
            username: 'kamran',
            password: 'ka'
        }
        await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    })

    test('missing password', async () => {
        const user = {
            name: 'kamran',
            username: 'kamran',
        }
        await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    })
})

after(async () => {
    await mongoose.connection.close()
})