const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/phonebook'

console.log('Connecting to database @ ' + url)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: { type: String, minLength: 3 },
    number: { type: String, validate: {
        validator: v => 
            /\d{3}/.test(v)
        ,
        message: 'Invalid phone number.' 
    } }
})

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)