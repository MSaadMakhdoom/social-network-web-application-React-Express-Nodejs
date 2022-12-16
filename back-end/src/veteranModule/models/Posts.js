// requier mongose 
const mongoose = require("mongoose")
// requier schema
const Schema = mongoose.Schema
// create schema
const postSchema = new Schema({
    title: {
        type: String
    }
    ,description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    vet_id: {
        type: Schema.Types.ObjectId,
        ref: "Veteran"
    },
    vet_name: {
        type: String
    }
})
// create model
var Post = mongoose.model("Post",postSchema)
// export model
module.exports = Post
