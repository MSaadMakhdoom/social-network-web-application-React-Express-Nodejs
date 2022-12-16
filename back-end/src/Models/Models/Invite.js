const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let inviteSchema = new Schema({
  userid: {
    type: String
  },
  veteranid: {
    type: String
  },
}, {
    collection: 'invite'
  })
module.exports = mongoose.model('Invite', inviteSchema)