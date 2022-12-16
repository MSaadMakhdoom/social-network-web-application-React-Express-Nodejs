const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  description: {
    type: String
  },
  typeofuser: {
    type: String
  },
}, {
    collection: 'user'
  })
module.exports = mongoose.model('User', userSchema)