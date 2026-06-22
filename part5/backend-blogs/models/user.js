const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  username: { type: String, required: true, minLength: 3, unique: true },
  passwordHash: { type: String, required: true },
  blogs: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' } ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)