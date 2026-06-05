const express = require('express')
const morgan = require('morgan')

const Person = require('./models/Person')

const app = express()
app.use(express.json())

morgan('tiny')
morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

const errorHandler = (error, request, response, next) => {
    console.log(error.name, error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: error.message })
    }
    if (error.name === 'ValidationError') {
        response.status(400).send({ error: error.message })
    }

    next()
}
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => response.json(persons))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => response.json(person))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(deletedPerson => response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const newPerson = new Person({ ...body })

    newPerson
        .save()
        .then(savedPerson => response.status(201).json(savedPerson))
        .catch(error => { next(error) })
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person
        .findById(id)
        .then(person => {
            person.number = request.body.number
            person
                .save()
                .then(updatedPerson => response
                    .status(201)
                    .json(updatedPerson))
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            response.send(`
                <p>Phonebook has info for ${Person.length} people</p>
                <p>${new Date().toString()}</p>
            `)
        })
        .catch(error => { next(error) })
})

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening to PORT:${PORT}`)
})