const express = require("express")
const morgan = require("morgan")

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

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const person = persons.find(p => p.id === request.params.id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).json({ "error": "person not found!" })
    }
})

app.delete("/api/persons/:id", (request, response) => {
    persons = persons.filter(p => p.id !== request.params.id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    
    if(!body || !body.name || !body.number){
        return response.status(400).json({
            error: "invalid person info."
        })
    }

    const personExists = persons.find(p => p.name === body.name)
    if(personExists){
        return response.status(400).json({
            error: `person with name ${personExists.name} already exists`
        })
    }

    const newPerson = {
        ...body,
        id: Math.random() * 999999 + 1
    }
    persons = persons.concat(newPerson)

    response.status(201).json(newPerson)
})

app.get("/info", (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
    `)
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Listening to PORT:${PORT}`)
})