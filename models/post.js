const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const USER = require("./model")

const postSchema = new mongoose.Schema({

    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "USER"
    }],
    comments: [{
        comment: String,
        postedBy: { type: ObjectId, ref: "USER" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
}, { timestamps: true });

mongoose.model("POST", postSchema);