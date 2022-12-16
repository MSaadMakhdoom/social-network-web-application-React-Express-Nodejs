const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let postSchema = new Schema({
  userid: {
    type: String
  },
  username: {
    type: String
  },
  postdescription: {
    type: String
  },
  setstars: {
    type: String
  },
},{
  collection: 'communitypost'
})
module.exports = mongoose.model('CommunityPost',postSchema)