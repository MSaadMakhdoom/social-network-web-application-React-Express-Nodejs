const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const veteranSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String
    }
    ,
    date: {
        type: Date,
        default: Date.now
    },
    followings: {
        veternFollowings:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Veteran"
                }
            ]

    },
    followers: {
        veternFollowers:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Veteran"
                }
            ]
    }
    ,
    hobbies: [
        {
            type: String
        }
    ],
    stars: {
        type: Number,
        default: 0
    }
});

var Veteran = mongoose.model("Veteran",veteranSchema);
module.exports = Veteran;
