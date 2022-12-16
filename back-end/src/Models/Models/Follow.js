const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let followSchema = new Schema({
  profileid: {
    type: String
  },
  profile_name: {
    type: String
  },
  follower_id: {
    type: String
  },
  follower_name: {
    type: String
  },
 
}, {
    collection: 'follow'
  })
module.exports = mongoose.model('Follow', followSchema)